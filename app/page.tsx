import { HomePage } from '@/src/page/home';
import { fetchProjects } from '@/src/shared/api/fetch-projects';

export default async function Home() {
  const data = await fetchProjects();

  return <HomePage data={data} />;
}
