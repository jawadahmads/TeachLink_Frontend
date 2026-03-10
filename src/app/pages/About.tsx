import {
  BookOpen,
  Users,
  Shield,
  Video,
  Search,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router";
import Header from "../components/Header";
import { useAppSelector } from "../redux/store";
import { currentStudent } from "../data/mockData";

export default function AboutPage() {
  const { user, token } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-white">
      {token ? (
        <Header
          userType={user?.role.toLowerCase() as any || "student"}
          userName={user?.name || user?.email || "User"}
          userAvatar={user?.avatar || currentStudent.avatar}
        />
      ) : (
        <nav className="border-b border-border bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-primary">TeachLink</span>
              </Link>
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}

      <header className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About TeachLink
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We connect students with verified expert teachers for personalised,
            flexible and secure online learning. Our mission is to make quality
            education accessible — anytime, anywhere.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/search">
              <Button size="lg" className="px-8">
                Find a Teacher
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="px-8">
                Become a Teacher
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section id="about" className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              TeachLink exists to bridge learners and educators with trusted,
              high-quality instruction. We prioritise verification, transparency
              and a great learning experience — from discovery to secure
              payments and ongoing support.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-2">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Verified Teachers</h4>
                      <p className="text-sm text-muted-foreground">
                        Profiles, reviews and credentials so you can book with
                        confidence.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Video className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Live Sessions</h4>
                      <p className="text-sm text-muted-foreground">
                        High-quality video, whiteboard and resources for active
                        learning.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Search className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Smart Discovery</h4>
                      <p className="text-sm text-muted-foreground">
                        Filter by subject, availability and ratings to find the
                        perfect match.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Secure Payments</h4>
                      <p className="text-sm text-muted-foreground">
                        Protected transactions and clear refund policies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1557800636-894a64c1696f?w=900&h=700&fit=crop"
              alt="About TeachLink"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-6">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <CardContent>
                <div className="text-3xl text-primary font-bold mb-2">
                  Trust
                </div>
                <p className="text-muted-foreground">
                  Verification, reviews and transparent policies keep our
                  community safe.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent>
                <div className="text-3xl text-primary font-bold mb-2">
                  Quality
                </div>
                <p className="text-muted-foreground">
                  We prioritise skilled teachers and strong pedagogy.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent>
                <div className="text-3xl text-primary font-bold mb-2">
                  Access
                </div>
                <p className="text-muted-foreground">
                  Learning should be flexible and available to learners
                  everywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Ready to learn?</h3>
          <p className="text-muted-foreground mb-6">
            Join thousands of students and discover expert teachers today.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/search">
              <Button size="lg" className="px-8">
                Find a Teacher
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="px-8">
                Become a Teacher
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
