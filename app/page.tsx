
import SingleBlog from "@/components/SingleBlog/SingleBlog";
import getBlogs,{IBlogParams} from "./actions/getBlogs"
import getCurrentUser from "./actions/getCurrentUser"
import Link from "next/link";

interface HomeProps {
  searchParams: IBlogParams
};



export default async function Home({searchParams}:HomeProps) {

  const currentUser = await getCurrentUser();

  const blogs = await getBlogs(searchParams)

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 gap-4 md:w-[600px] m-auto">
        {blogs.map((item:any) => (
          <SingleBlog
          key={item.id}
          data={item}
          currentUser={currentUser}
          />
        ))}
    </main>
  )
  }