import { useEffect, useRef } from "react";

const AUTO_STOP_MS = 0;

export default function GlobalAudioPlayer() {
  const audioRef = useRef(null);
  const autoStopTimerRef = useRef(null);

  const clearAutoStop = () => {
    if (!autoStopTimerRef.current) return;
    clearTimeout(autoStopTimerRef.current);
    autoStopTimerRef.current = null;
  };

  const scheduleAutoStop = () => {
    if (!AUTO_STOP_MS || AUTO_STOP_MS <= 0) return;
    clearAutoStop();
    autoStopTimerRef.current = setTimeout(() => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
      window.dispatchEvent(new CustomEvent("global-audio-state", { detail: { on: false } }));
    }, AUTO_STOP_MS);
  };

  const setOff = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    clearAutoStop();
    window.dispatchEvent(new CustomEvent("global-audio-state", { detail: { on: false } }));
  };

  const setOn = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.muted = false;
      audio.currentTime = 0;
      await audio.play();
      scheduleAutoStop();
      window.dispatchEvent(new CustomEvent("global-audio-state", { detail: { on: true } }));
    } catch {
      clearAutoStop();
      window.dispatchEvent(new CustomEvent("global-audio-state", { detail: { on: false } }));
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;
    audio.muted = false;

    const tryAutoplay = async () => {
      await setOn();
    };

    const onGlobalAudioControl = (event) => {
      const { on } = event.detail || {};
      if (on) {
        setOn();
      } else {
        setOff();
      }
    };

    const onAudioEnded = () => {
      clearAutoStop();
      window.dispatchEvent(new CustomEvent("global-audio-state", { detail: { on: false } }));
    };

    const onFirstUserGesture = () => {
      setOn();
      window.removeEventListener("pointerdown", onFirstUserGesture);
      window.removeEventListener("keydown", onFirstUserGesture);
      window.removeEventListener("touchstart", onFirstUserGesture);
    };

    window.addEventListener("global-audio-control", onGlobalAudioControl);
    audio.addEventListener("ended", onAudioEnded);

    window.addEventListener("pointerdown", onFirstUserGesture);
    window.addEventListener("keydown", onFirstUserGesture);
    window.addEventListener("touchstart", onFirstUserGesture);

    tryAutoplay();

    return () => {
      window.removeEventListener("global-audio-control", onGlobalAudioControl);
      audio.removeEventListener("ended", onAudioEnded);

      window.removeEventListener("pointerdown", onFirstUserGesture);
      window.removeEventListener("keydown", onFirstUserGesture);
      window.removeEventListener("touchstart", onFirstUserGesture);

      clearAutoStop();
    };
  }, []);

  return (
    <audio ref={audioRef} preload="auto">
      <source src="/media/ambient.mp3" type="audio/mpeg" />
    </audio>
  );
}
