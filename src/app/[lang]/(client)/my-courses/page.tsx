import { TLocale } from "@/i18n";
import { getDictionary } from "@/get-dictionary";
import { getCourses, getUser} from "@/_actions/actions";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { CourseCard } from "@/components/course-card";
import Link from "next/link";

const UserCourses = async ({ lang }: { lang: TLocale }) => {
  const user = await getUser();

  if (!user) redirect(`/${lang}/sign-in?redirect=my-courses`);

  const courses = await getCourses();

  if (!courses) {
    return <h1>Todavia no has adquirido ningun curso.</h1>;
  }

  return (
    <>
      <ul>
        {courses.map((course) => (
          <li key={`${course.type}-${course.id}`} className="mb-6">
            <Link href={`/my-courses/${course.type}/${course.id}`}>
            <CourseCard {...course} showPrice={false} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default async function MyCourses({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return (
    <div>
      <h1 className="mb-8 text-center font-serif text-4xl tracking-tight sm:mb-12 md:mb-16 lg:text-5xl xl:text-6xl">
        {dictionary.my_courses}
      </h1>
      <Suspense fallback={"...Cargando cursos"}>
        <UserCourses lang={lang} />
      </Suspense>
    </div>
  );
}
