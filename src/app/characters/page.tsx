"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";

import { CharacterCard } from "@/components/CharacterCard";
import { Character } from "@/types";
import { useDebounce } from "@/hooks";

const GET_CHARACTERS = gql`
  query Characters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        next
        count
      }
      results {
        id
        name
        image
        species
        status
      }
    }
  }
`;

const CharactersPage: React.FC<{}> = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const debouncedName = useDebounce(name, 500);

  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { name: debouncedName },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        !loading &&
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, data, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLoadMore = () => {
    console.log("handleLoadMore");
    console.log(loading, data);
    console.log(data.characters.info.next);
    console.log(page);

    if (!data || !data.characters.info.next || loading) return;
    fetchMore({
      variables: { page: data.characters.info.next },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log(prev, fetchMoreResult);
        if (!fetchMoreResult) return prev;
        return {
          characters: {
            info: fetchMoreResult.characters.info,
            results: [
              ...prev.characters.results,
              ...fetchMoreResult.characters.results,
            ],
            __typename: "Characters",
          },
        };
      },
    });
    setPage(data.characters.info.next);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
    setPage(1);
  };

  if (error) return <p>Error: {error.message}</p>;

  const { characters } = data || {};

  return (
    <div className="flex flex-col">
      <div className="my-5 flex flex-row">
        <input
          type="search"
          placeholder="Search"
          onChange={handleSearch}
          value={name}
          className="p-3 outline-none bg-gray-700 rounded-sm text-gray-50 w-4/12 border-2 border-[#39ff14]"
        />
      </div>

      <div className="gap-4 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {!characters && loading && <p>Loading...</p>}
        {characters &&
          characters.results.map((character: Character) => (
            <CharacterCard
              key={character.id}
              data={character}
              onClick={(id: string) => {
                router.push(`/characters/${id}`);
              }}
            />
          ))}
      </div>

      {/* {characters && characters.info.next && (
        <div className="flex flex-row justify-center my-5">
          <button
            onClick={handleLoadMore}
            className="text-lg p-4 border-2 border-[#39ff14] rounded-full text-[#f8fe76]"
          >
            Load More
          </button>
        </div>
      )} */}
    </div>
  );
};

export default CharactersPage;
