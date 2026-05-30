import './VideoPlayer.css'

function VideoPlayer({ embedUrl }) {
  if (!embedUrl) return null

  return (
    <div className="player">
      <div className="player__wrapper">
        <iframe
          src={embedUrl}
          className="player__iframe"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          scrolling="no"
          title="Aurora Video Player"
        />
      </div>
    </div>
  )
}

export default VideoPlayer