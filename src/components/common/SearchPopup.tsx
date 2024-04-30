'use client'
import Container from "@/components/common/Container";
import { SearchIcon } from "lucide-react";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import { useAppContext } from "@/context/app.context";
import { useState } from "react";
import { useRouter } from "next13-progressbar";


export default function SearchPopup() {
    const router = useRouter();
    const { appState: { showSearch}, setAppContextState } = useAppContext();
    const [keyword, setKeyword] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(keyword) {
            console.log('THE KEYWORD::', keyword)
            router?.push(`/search?q=${keyword}`);
            setAppContextState({ showSearch: false });
        }
    }

    if(!showSearch) {
        return null;
    }

    return <div className={'top-0 left-0 bottom-0 right-0 bg-black/50 fixed'} style={{ zIndex: 100 }}>
        <form onSubmit={handleSearch} className={'flex justify-center items-center md:m-default_spacing_lg text-muted'}>
            <Container>
                <div className={'p-default_spacing bg-card md:rounded-lg'}>
                    <div className={'h-12 flex items-center gap-default_spacing'}>
                        <SearchIcon />
                        <input placeholder={'Search for movies..'} className={'bg-card flex-1 outline-none h-full'} autoFocus onChange={e => setKeyword(e.target.value)} />
                        <button onClick={() => setAppContextState({
                            showSearch: false
                        })} type={'button'}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            </Container>
        </form>
    </div>
}

