import { useRouter } from 'next/router';
import Seo from '../../component/Seo';

export default function Detail() {
  const router = useRouter();
  const [title, id] = router.query.params || [];
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}

export function getServerSideProps(ctx) {
  console.log(ctx);
  return {
    props: {},
  };
}
