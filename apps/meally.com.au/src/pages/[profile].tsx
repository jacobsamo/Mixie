// pages/[...slug].tsx

import { useRouter } from 'next/router';
import {
    GetStaticPathsResult,
    GetStaticPropsContext,
    GetStaticPropsResult,
  } from 'next';

interface SlugPageProps {
  id: string;
}

function SlugPage({ id }: SlugPageProps) {
  return (
    <div>
      <h1>Page for path: {id}</h1>
      {/* your page content here */}
    </div>
  );
}

export default SlugPage;

export async function getServerSideProps(context: any) {
  return {
    props: {
      id: context.params.id,
    }, // will be passed to the page component as props
  };
}
