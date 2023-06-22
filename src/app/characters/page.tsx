"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";

// Components and hooks section
import { CharacterCard } from "@/components/CharacterCard";
import { Search } from "@/components/Search";
import { useDebounce } from "@/hooks";

// Types section
import { Character } from "@/types";

// GraphQL queries section
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

  // Infinite scroll implementation
  useEffect(() => {
    const handleScroll = () => {
      const innerHeight =
        window.innerHeight + document.documentElement.scrollTop;
      const offsetHeight = document.documentElement.offsetHeight;
      if (!loading && innerHeight === offsetHeight) {
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, data, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLoadMore = () => {
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

  const { characters } = data || {};

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col">
      <div className="my-5 flex flex-row w-4/12">
        <Search onChange={handleSearch} value={name} />
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
    </div>
  );
};

export default CharactersPage;
