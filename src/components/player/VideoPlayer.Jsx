import './VideoPlayer.css'

function VideoPlayer({ embedUrl }) {
  if (!embedUrl) return null

  return (
    <div className="watch__player-section">
        {embedUrl && (
            <div className="player">
                <div className="player__wrapper">
                    <iframe
                        src={embedUrl}
                        allowFullScreen
                        allow="autoplay; fullscreen; picture-in-picture"
                        referrerPolicy="origin"
                        title="Aurora Video Player"
                    />
                </div>
            </div>
        )}
    </div>
  )
}



export default VideoPlayer