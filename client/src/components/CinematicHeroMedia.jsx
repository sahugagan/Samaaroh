import { useEffect, useState } from "react";

const VIDEO_SRC = "/media/hero-3d.mp4";
const POSTER_SRC = "/media/hero-poster.jpg";

export default function CinematicHeroMedia() {
  const [videoError, setVideoError] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  useEffect(() => {
    const onAudioState = (event) => {
      const on = Boolean(event?.detail?.on);
      setAudioOn(on);
    };

    window.addEventListener("global-audio-state", onAudioState);
    return () => window.removeEventListener("global-audio-state", onAudioState);
  }, []);

  const toggleAudio = () => {
    window.dispatchEvent(new CustomEvent("global-audio-control", { detail: { on: !audioOn } }));
  };

  return (
    <div className={`cinematic-media ${videoError ? "no-file-mode" : ""}`}>
      {!videoError ? (
        <>
          <video
            className="cinematic-video"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
            preload="auto"
            poster={POSTER_SRC}
            onError={() => setVideoError(true)}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>

          <button
            className={`hero-audio-toggle ${audioOn ? "on" : ""}`}
            type="button"
            onClick={toggleAudio}
            aria-label="Toggle sound"
          >
            {audioOn ? "Sound On" : "Sound Off"}
          </button>
        </>
      ) : (
        <div className="cinematic-fallback">
          <h3>CINEMATIC MODE</h3>
          <p>
            Video load failed. Check: <code>/public/media/hero-3d.mp4</code>
          </p>
        </div>
      )}
    </div>
  );
}
