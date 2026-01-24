import React from "react";
import CreateBlogFromServer from "@/components/modules/user/createBlog/CreateBlogFromServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function CreateBlogPage() {
  const { data } = await blogService.getBlogPosts();

  return (
    <div>
      <CreateBlogFromServer />
      {data.data.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}
