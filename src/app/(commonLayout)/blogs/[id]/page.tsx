import { blogService } from "@/services/blog.service";
import { BlogPost } from "./../../../../types/blog.type";

//* [{id:aslfj},{id:safias},{id:asfjlkas}]
export async function generateStaticParams() {
  const res: any = await blogService.getBlogPosts();

  // Guard to prevent build crash if data is missing
  if (!res?.data?.data) return [];

  return res.data.data.map((blog: BlogPost) => ({ id: blog.id })).slice(0, 3);
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Use 'any' type casting here to bypass the strict "Property data does not exist" check
  const res: any = await blogService.getBlogById(id);

  // Safely check if data exists before rendering
  const blog = res?.data?.data;

  return (
    <div>
      <h1>This is a dynamic page {id}</h1>
      {blog && (
        <div>
          <h2>{blog.title}</h2>
        </div>
      )}
    </div>
  );
}
