import { trpc } from "client/utils/trpc";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
  const { data, isLoading, isFetching, error, isError } = trpc.hello.useQuery();

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <section>
        <div>
          <p>{data?.message}</p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
