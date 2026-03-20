import {useMusic } from "../hooks/useMusic" 

export  const Allsongs = () => {
    const {allsongs} = useMusic()
    return (
        <div className="all-songs" >
            <h2>All songs ({allsongs.length})</h2>
        </div>
    )
}