import {
    getSeriesEpisodes,
    getSeriesSeasons,
} from "@/app/api/public/film/series/series.api";

export default async function FilmPlayerRight({ data }: any) {
    const query = data.searchParams;

    let episode = query?.episode || 1;
    let season = query?.season || 1;

    let seasons = await getSeriesSeasons("tv/" + data.params.slug);
    let episodes = await getSeriesEpisodes({
        slug: `tv/${data.params.slug}`,
        season,
    });

    return (
        <>
            <div
                className={
                    "bg-card rounded-lg p-default_spacing min-w-80 max-w-80 overflow-y-auto"
                }
            >
                {seasons &&
                    seasons.map((val) => {
                        return <h3 key={crypto.randomUUID()}>{val?.title}</h3>;
                    })}
            </div>
        </>
    );
}
