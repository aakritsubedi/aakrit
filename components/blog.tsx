"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    title: "Using free resources for uptime monitor and status page",
    date: "Sept 2024",
    excerpt:
      "Setting up a free monitoring tool using Github powered by an open-source uptime monitor and status page.",
    link: "https://medium.com/@subediaakrit/using-free-resources-for-uptime-monitor-and-status-page-06b60ce53c08",
  },
  // Add more blog posts here
];

const POSTS_PER_PAGE = 2;

export function Blog() {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = posts.slice(
    currentPage * POSTS_PER_PAGE,
    (currentPage + 1) * POSTS_PER_PAGE
  );

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () =>
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <section id="blog" className="py-16 md:p-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4 mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            ✍️ Blog
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Sharing my thoughts and experiences in software development and
            technology.
          </p>
        </motion.div>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {currentPosts.map((post) => (
                <Link href={post.link} key={post.title}>
                  <Card
                    key={post.title}
                    className="h-full hover:cursor-pointer"
                  >
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays className="mr-1 h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
          {totalPages > POSTS_PER_PAGE && (
            <div className="flex justify-center mt-8 gap-4">
              <Button variant="outline" size="icon" onClick={prevPage}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextPage}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
