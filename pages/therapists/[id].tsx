import { getAllTherapists, getTherapistById } from '../../lib/API';
import { ITherapistData } from '../../lib/types';

export default ({ therapist }: { therapist: ITherapistData }) => {
  console.log(therapist);
  return <div>Bruh!</div>;
};

export async function getStaticProps({ params }: any) {
  const { id } = params;
  const therapist = await getTherapistById(id);
  return {
    props: {
      therapist,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const therapists = await getAllTherapists();
  const paths = therapists.map((therapist) => ({
    params: { id: therapist.id },
  }));
  return { paths, fallback: 'blocking' };
}
