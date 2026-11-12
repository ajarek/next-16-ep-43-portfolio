"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroVideoProps {
  className?: string
}

export function HeroVideo({ className }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [showControls, setShowControls] = useState<boolean>(false)
  const [isControlsHovered, setIsControlsHovered] = useState<boolean>(false)
  const [showCenterFeedback, setShowCenterFeedback] = useState<boolean>(false)

  // Planowanie automatycznego ukrycia panelu po określonym czasie bezczynności
  const scheduleControlsHide = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }
    // Ukrywamy panel po 4 sekundach bezczynności, jeśli nie najeżdżamy na kontrolki
    hideTimeoutRef.current = setTimeout(() => {
      if (!isControlsHovered) {
        setShowControls(false)
      }
    }, 4000)
  }, [isControlsHovered])

  // Automatyczne uruchomienie wideo po załadowaniu
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          // Autoodtwarzanie zablokowane przez przeglądarkę
          setIsPlaying(false)
        })
    }
  }, [])

  // Śledzenie stanu pełnego ekranu
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Czyszczenie timera przy odmontowaniu
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [])

  // Obsługa kliknięcia na ekran wideo – przełącza widoczność panelu sterującego
  const handleScreenClick = () => {
    setShowControls((prev) => {
      const nextState = !prev
      if (nextState) {
        scheduleControlsHide()
      } else if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
      return nextState
    })
  }

  // Przełączanie odtwarzania i pauzy
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
      scheduleControlsHide()
    } else {
      video.pause()
      setIsPlaying(false)
      // Gdy pauzujemy, zatrzymujemy timer automatycznego chowania
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }

    setShowCenterFeedback(true)
    setTimeout(() => {
      setShowCenterFeedback(false)
    }, 500)
  }

  // Przełączanie wyciszenia
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    const nextMuted = !video.muted
    video.muted = nextMuted
    setIsMuted(nextMuted)
    scheduleControlsHide()
  }

  // Przełączanie trybu pełnoekranowego
  const toggleFullscreen = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const container = containerRef.current
    if (!container) return

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      // Ignorujemy błędy braku uprawnień do pełnego ekranu
    }
    scheduleControlsHide()
  }

  // Restart od początku
  const handleRestart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    video.currentTime = 0
    video.play().catch(() => {})
    setIsPlaying(true)
    scheduleControlsHide()
  }

  // Aktualizacja czasu trwania
  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return
    setCurrentTime(video.currentTime)
  }

  // Załadowanie metadanych wideo
  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (!video) return
    setDuration(video.duration || 0)
  }

  // Przewijanie wideo przez kliknięcie na pasek postępu
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, clickX / rect.width))
    const newTime = percentage * duration

    video.currentTime = newTime
    setCurrentTime(newTime)
    scheduleControlsHide()
  }

  // Formatowanie sekund do formatu MM:SS
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return "00:00"
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      ref={containerRef}
      className={cn("group relative w-full select-none", className)}
    >
      {/* Poświata gradientowa za odtwarzaczem */}
      <div className='absolute -inset-1 rounded-[2.2rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_35%,transparent)_0%,color-mix(in_oklab,var(--primary-container)_25%,transparent)_45%,transparent_70%)] blur-2xl transition-opacity duration-500 group-hover:opacity-100' />

      {/* Główna szklana ramka */}
      <div className='relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface-container-low/80 p-2.5 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-3'>
        {/* Wewnętrzny kontener wideo z zachowaniem proporcji 16/9 */}
        <div
          onClick={handleScreenClick}
          className='relative aspect-video w-full cursor-pointer overflow-hidden rounded-[1.35rem] border border-border/60 bg-surface-container-lowest'
        >
          <video
            ref={videoRef}
            src='/videos/hero-video.mp4'
            poster='/images/hero.png'
            playsInline
            loop
            muted={isMuted}
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className='h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]'
          />

          {/* Subtelny filtr gradientowy */}
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/25' />

          {/* Wskaźnik kliknięcia na środku wideo */}
          {showCenterFeedback && (
            <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
              <div className='flex size-16 items-center justify-center rounded-full border border-white/20 bg-background/80 text-foreground shadow-2xl backdrop-blur-md animate-out fade-out zoom-out'>
                {isPlaying ? (
                  <Play className='size-8 translate-x-0.5 text-primary' />
                ) : (
                  <Pause className='size-8 text-primary' />
                )}
              </div>
            </div>
          )}

          {/* Górna belka: wskaźnik showcase oraz podpowiedź kliknięcia */}
          <div className='pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between gap-2 sm:inset-x-4 sm:top-4'>
            {/* Wskaźnik stanu wideo */}
            <div className='inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md shadow-md'>
              <span className='relative flex size-2'>
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full rounded-full opacity-75",
                    isPlaying ? "animate-ping bg-emerald-400" : "bg-amber-400"
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex size-2 rounded-full",
                    isPlaying ? "bg-emerald-500" : "bg-amber-500"
                  )}
                />
              </span>
              <span>{isPlaying ? "Showcase 16:9 • Na żywo" : "Wideo wstrzymane"}</span>
            </div>

            {/* Dyskretna podpowiedź o kliknięciu na ekran */}
            <div
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur-md transition-opacity duration-300",
                showControls ? "opacity-0" : "opacity-90"
              )}
            >
              <SlidersHorizontal className='size-3 text-primary' />
              <span>Kliknij ekran</span>
            </div>
          </div>

          {/* Duży przycisk wznowienia na środku gdy wideo jest zatrzymane */}
          {!isPlaying && !showCenterFeedback && (
            <div
              onClick={togglePlay}
              className='pointer-events-auto absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-[2px] transition-all'
            >
              <div className='flex size-18 items-center justify-center rounded-full border border-primary/40 bg-surface-container-high/90 text-primary shadow-2xl transition-transform hover:scale-110 active:scale-95'>
                <Play className='size-9 translate-x-0.5' />
              </div>
            </div>
          )}

          {/* Dolny panel sterujący – pojawia się po kliknięciu na ekran */}
          <div
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setIsControlsHovered(true)}
            onMouseLeave={() => {
              setIsControlsHovered(false)
              if (isPlaying) {
                scheduleControlsHide()
              }
            }}
            className={cn(
              "absolute inset-x-2 bottom-2 rounded-xl border border-border/70 bg-background/90 p-2 backdrop-blur-md transition-all duration-300 ease-out sm:inset-x-3 sm:bottom-3 sm:p-2.5",
              showControls
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none translate-y-4 opacity-0"
            )}
          >
            {/* Pasek postępu */}
            <div
              onClick={handleSeek}
              className='group/bar relative mb-2 h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-border/50 transition-all hover:h-2'
              role='slider'
              aria-label='Pasek przewijania wideo'
              aria-valuenow={currentTime}
              aria-valuemin={0}
              aria-valuemax={duration || 100}
            >
              <div
                className='h-full rounded-full bg-[linear-gradient(90deg,var(--primary-container),var(--primary))] transition-all duration-100'
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Przyciski i elementy sterujące */}
            <div className='flex items-center justify-between gap-2 text-foreground'>
              {/* Lewa strona: Start/Pauza, Restart, Czas trwania */}
              <div className='flex items-center gap-1 sm:gap-2'>
                {/* Przycisk Odtwórz / Wstrzymaj */}
                <button
                  type='button'
                  onClick={togglePlay}
                  className='inline-flex size-8 items-center justify-center rounded-lg border border-border/60 bg-surface-container/60 text-foreground transition-colors hover:border-primary/40 hover:bg-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                  title={isPlaying ? "Wstrzymaj wideo" : "Odtwórz wideo"}
                  aria-label={isPlaying ? "Wstrzymaj wideo" : "Odtwórz wideo"}
                >
                  {isPlaying ? (
                    <Pause className='size-4 text-primary' />
                  ) : (
                    <Play className='size-4 translate-x-0.5 text-primary' />
                  )}
                </button>

                {/* Przycisk Od nowa */}
                <button
                  type='button'
                  onClick={handleRestart}
                  className='inline-flex size-8 items-center justify-center rounded-lg border border-border/60 bg-surface-container/60 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-surface-container-high hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                  title='Odtwórz od początku'
                  aria-label='Odtwórz od początku'
                >
                  <RotateCcw className='size-3.5' />
                </button>

                {/* Wskaźnik czasu */}
                <span className='px-1 font-mono text-[11px] text-muted-foreground sm:text-xs'>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Prawa strona: Dźwięk oraz Pełny ekran */}
              <div className='flex items-center gap-1 sm:gap-2'>
                {/* Przycisk Wycisz / Włącz dźwięk */}
                <button
                  type='button'
                  onClick={toggleMute}
                  className='inline-flex size-8 items-center justify-center rounded-lg border border-border/60 bg-surface-container/60 text-foreground transition-colors hover:border-primary/40 hover:bg-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                  title={isMuted ? "Włącz dźwięk" : "Wycisz dźwięk"}
                  aria-label={isMuted ? "Włącz dźwięk" : "Wycisz dźwięk"}
                >
                  {isMuted ? (
                    <VolumeX className='size-4 text-muted-foreground' />
                  ) : (
                    <Volume2 className='size-4 text-primary' />
                  )}
                </button>

                {/* Przycisk Pełny ekran */}
                <button
                  type='button'
                  onClick={toggleFullscreen}
                  className='inline-flex size-8 items-center justify-center rounded-lg border border-border/60 bg-surface-container/60 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-surface-container-high hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                  title={
                    isFullscreen
                      ? "Opuść pełny ekran"
                      : "Włącz tryb pełnoekranowy"
                  }
                  aria-label={
                    isFullscreen
                      ? "Opuść pełny ekran"
                      : "Włącz tryb pełnoekranowy"
                  }
                >
                  {isFullscreen ? (
                    <Minimize className='size-3.5' />
                  ) : (
                    <Maximize className='size-3.5' />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dolna etykieta „Dostarczam premium experience" zharmonizowana z całą kartą */}
        <div className='mt-3 flex items-center justify-between rounded-xl border border-border/50 bg-background/50 px-4 py-2.5 backdrop-blur-sm'>
          <div>
            <p className='text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:text-xs'>
              Standard wykonania
            </p>
            <p className='text-sm font-semibold text-foreground sm:text-base'>
              Premium digital experience
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <span className='size-1.5 rounded-full bg-primary/70' />
            <span className='text-xs text-muted-foreground'>1080p • 16:9</span>
          </div>
        </div>
      </div>
    </div>
  )
}
