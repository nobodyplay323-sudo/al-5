"""Backend API tests for Jucăuș Magazine."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://dynamic-site-26.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---------- Posts ----------
class TestPosts:
    def test_get_all_posts(self, s):
        r = s.get(f"{API}/posts", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 6
        # No _id leak
        assert all("_id" not in p for p in data)
        # Required fields
        for p in data:
            for k in ("slug", "title", "category", "author", "cover", "accent", "read_time"):
                assert k in p

    def test_filter_by_category_arta(self, s):
        r = s.get(f"{API}/posts", params={"category": "Artă"}, timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 1
        assert all(p["category"] == "Artă" for p in data)

    def test_filter_toate_returns_all(self, s):
        r = s.get(f"{API}/posts", params={"category": "Toate"}, timeout=30)
        assert r.status_code == 200
        assert len(r.json()) == 6

    def test_featured_filter(self, s):
        r = s.get(f"{API}/posts", params={"featured": "true"}, timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert all(p["featured"] is True for p in data)
        assert len(data) >= 2

    def test_get_post_by_slug(self, s):
        r = s.get(f"{API}/posts/manifestul-culorii", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert data["slug"] == "manifestul-culorii"
        assert data["category"] == "Artă"
        assert len(data["body"]) > 0

    def test_get_post_unknown_slug_404(self, s):
        r = s.get(f"{API}/posts/does-not-exist-xyz", timeout=30)
        assert r.status_code == 404


# ---------- Categories ----------
class TestCategories:
    def test_get_categories(self, s):
        r = s.get(f"{API}/categories", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert "categories" in data
        cats = data["categories"]
        assert cats[0] == "Toate"
        assert "Artă" in cats
        assert "Modă" in cats


# ---------- Newsletter ----------
class TestNewsletter:
    def test_subscribe_valid_email(self, s):
        email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        r = s.post(f"{API}/newsletter", json={"email": email}, timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert data["already"] is False
        assert "message" in data

        # Same email -> already
        r2 = s.post(f"{API}/newsletter", json={"email": email}, timeout=30)
        assert r2.status_code == 200
        assert r2.json()["already"] is True

    def test_subscribe_invalid_email(self, s):
        r = s.post(f"{API}/newsletter", json={"email": "not-an-email"}, timeout=30)
        assert r.status_code == 422
