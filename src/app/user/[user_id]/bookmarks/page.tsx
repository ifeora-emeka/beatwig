import PageContainer from '@/components/common/PageContainer'
import PageSection from '@/components/common/PageSection'
import React from 'react'
import { BookmarkIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import { getAllUserBookmarks } from '@/firebase/film.firebase'
import EachFilmLg from '@/app/film/components/EachFilmLg'
import Link from 'next/link'

export default async function page() {
    const headers = cookies();

    let bookmarks = await getAllUserBookmarks(headers.get("user_id")?.value as string);

    return (
        <>
            <PageContainer withTopLinks={false}>
                <PageSection Icon={BookmarkIcon} heading={"Bookmarked films"}>
                    {
                        bookmarks.map((bookmark) => {
                            return <Link href={`/film/${bookmark.type}/${bookmark.slug}`} key={bookmark.slug}>
                                <EachFilmLg data={bookmark as any} />
                            </Link>
                        })
                    }
                </PageSection>
            </PageContainer>
        </>
    )
}
