import json
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

# Load seed data
SEED_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "seed_data.json")

def load_seed_data():
    if os.path.exists(SEED_PATH):
        with open(SEED_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

class APIRequestHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def _respond_json(self, status, data):
        self.send_response(status)
        self._send_cors_headers()
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        seed = load_seed_data()

        if path == "/api/summary":
            self._respond_json(200, seed.get("summary", {}))
        elif path == "/api/sentiment/over-time":
            self._respond_json(200, {
                "sentiment_over_time": seed.get("sentiment_over_time", []),
                "emotion_distribution": seed.get("emotion_distribution", []),
                "sample_posts": seed.get("posts", [])
            })
        elif path == "/api/demographics":
            self._respond_json(200, seed.get("demographics", {}))
        elif path == "/api/trends":
            self._respond_json(200, seed.get("trending_topics", []))
        elif path == "/api/network":
            self._respond_json(200, seed.get("network_graph", {}))
        elif path == "/api/alerts":
            self._respond_json(200, seed.get("alerts", []))
        elif path == "/api/health":
            self._respond_json(200, {"status": "online", "service": "NTRO SIH Backend Service"})
        else:
            self._respond_json(404, {"error": "Endpoint not found"})

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
        try:
            payload = json.loads(body)
        except Exception:
            payload = {}

        if path == "/api/sentiment/analyze":
            text = payload.get("text", "")
            # Simple rule-based mock model logic for instant processing
            score = 0.85 if "excellent" in text.lower() or "support" in text.lower() else -0.72
            emotion = "Support" if score > 0 else ("Sarcasm" if "/s" in text else "Anger")
            self._respond_json(200, {
                "text": text,
                "sentiment": "positive" if score > 0 else "negative",
                "score": score,
                "emotion": emotion,
                "confidence": 0.94
            })
        elif path == "/api/auth/login":
            role = payload.get("role", "analyst")
            self._respond_json(200, {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "user": {
                    "username": payload.get("username", "analyst_ntro"),
                    "role": role,
                    "access_level": "Full Multipage Access" if role == "analyst" else "Public Overview Only"
                }
            })
        else:
            self._respond_json(404, {"error": "Endpoint not found"})

def run(server_class=HTTPServer, handler_class=APIRequestHandler, port=8000):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"NTRO Social Media Analytics Backend running at http://localhost:{port}/api")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
