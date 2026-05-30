import './VideoPlayer.css'

function VideoPlayer({ embedUrl }) {
  return (
    <div className="player">
      <div className="player__wrapper">
        <iframe
          src={embedUrl}
          className="player__iframe"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="no-referrer"
          title="Aurora Video Player"
        />
      </div>
    </div>
  )
}

export default VideoPlayer