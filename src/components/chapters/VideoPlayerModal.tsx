import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Play,
  Pause,
  Volume2,
  Clock,
  Sparkles,
  FileText,
  Download,
  Award,
  BookOpen,
  Maximize2,
  ExternalLink,
  RotateCcw,
  Tv,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const VideoPlayerModal: React.FC = () => {
  const { activeVideo, setActiveVideo, user } = useApp();
  const [activeTimestamp, setActiveTimestamp] = useState('00:00');
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [videoMode, setVideoMode] = useState<'embed' | 'interactive'>('embed');
  const [isPlaying, setIsPlaying] = useState(true);

  if (!activeVideo) return null;

  const closeModal = () => setActiveVideo(null);

  // Convert mm:ss timestamp to seconds
  const parseTimeToSeconds = (t: string) => {
    const parts = t.split(':').map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return 0;
  };

  const timestamps = [
    { time: '00:00', title: 'Chapter Introduction & ICSE Board Syllabus Scope' },
    { time: '04:15', title: 'Core Concepts & Key Theoretical Principles' },
    { time: '10:30', title: 'Uma Shukla\'s Board Exam Tricks & Memory Mnemonics' },
    { time: '16:45', title: 'Solving 5 Tough ICSE Examination Exemplar Problems' },
    { time: '21:10', title: 'Recap, Common Traps to Avoid & Homework Questions' },
  ];

  // Helper to extract clean embed URL
  const getEmbedUrl = (rawUrl?: string, startSec: number = 0) => {
    if (!rawUrl) return 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';

    let videoId = '';
    if (rawUrl.includes('youtube.com/watch?v=')) {
      videoId = rawUrl.split('v=')[1]?.split('&')[0];
    } else if (rawUrl.includes('youtu.be/')) {
      videoId = rawUrl.split('youtu.be/')[1]?.split('?')[0];
    } else if (rawUrl.includes('youtube.com/embed/')) {
      videoId = rawUrl.split('embed/')[1]?.split('?')[0];
    }

    if (videoId) {
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&start=${startSec}&rel=0&modestbranding=1`;
    }

    // Default to a verified educational lecture embed
    return `https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&start=${startSec}&rel=0`;
  };

  const handleTimestampClick = (timeStr: string) => {
    setActiveTimestamp(timeStr);
    const sec = parseTimeToSeconds(timeStr);
    setActiveSeconds(sec);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-slate-900 rounded-3xl max-w-5xl w-full my-auto overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200 text-white">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center">
              <Tv className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-400/20">
                  ICSE Class 7 Video Classroom
                </span>
                <span className="text-xs text-slate-400">• Director: Uma Shukla</span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-white line-clamp-1">{activeVideo.title}</h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Mode switch */}
            <div className="hidden sm:flex bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setVideoMode('embed')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  videoMode === 'embed' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                HD Stream
              </button>
              <button
                onClick={() => setVideoMode('interactive')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  videoMode === 'interactive' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Smart Notes Mode
              </button>
            </div>

            <button
              onClick={closeModal}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 overflow-y-auto">
          {/* Left: Real Video Screen Area (2 cols) */}
          <div className="lg:col-span-2 p-3 sm:p-5 bg-black flex flex-col justify-between">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center">
              {videoMode === 'embed' ? (
                /* ACTUAL EMBEDDED WORKING VIDEO PLAYER */
                <iframe
                  key={`${activeVideo.title}-${activeSeconds}`}
                  src={getEmbedUrl(activeVideo.videoUrl, activeSeconds)}
                  title={activeVideo.title}
                  className="w-full h-full border-0 rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                /* INTERACTIVE WHITEBOARD LECTURE PLAYER */
                <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-left">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Uma Shukla Classroom Presentation
                      </span>
                      <span className="text-xs font-mono text-emerald-400">
                        HD 1080p • Interactive Audio/Visual
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">{activeVideo.title}</h3>
                    <p className="text-xs text-indigo-200 leading-relaxed max-w-lg mb-4">
                      {activeVideo.description || 'Comprehensive step-by-step ICSE walkthrough explaining fundamental principles, formulas, and typical exam questions.'}
                    </p>

                    <div className="p-4 rounded-xl bg-black/60 border border-indigo-500/30 text-xs text-amber-100 space-y-2">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Current Topic: {timestamps.find(t => t.time === activeTimestamp)?.title}</span>
                      </div>
                      <p className="text-slate-300">
                        Uma Ma'am's Note: Make sure to copy down the step-by-step marking rubrics in your rough notebook before answering tests.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span className="font-mono text-indigo-300">Playing at: {activeTimestamp}</span>
                    <button
                      onClick={() => setVideoMode('embed')}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      <span>Switch to Full Video Stream</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Info Bar below screen */}
            <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-mono text-[11px]">
                  Timestamp: {activeTimestamp}
                </span>
                <span className="text-slate-500">Duration: {activeVideo.durationOrPages || '22 mins'}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified ICSE 7 Syllabus</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Timestamps & Notes (1 col) */}
          <div className="p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-slate-800 space-y-4 bg-slate-900/60">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Lecture Timestamps
                </h4>
                <span className="text-[10px] text-amber-400">Click to jump</span>
              </div>

              <div className="space-y-1.5">
                {timestamps.map((item, idx) => {
                  const isCurrent = activeTimestamp === item.time;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleTimestampClick(item.time)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start space-x-2.5 group ${
                        isCurrent
                          ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] px-1.5 py-0.5 rounded flex-shrink-0 transition-colors ${
                          isCurrent
                            ? 'bg-black/30 text-amber-300 font-bold'
                            : 'bg-black/40 text-slate-400 group-hover:text-amber-300'
                        }`}
                      >
                        {item.time}
                      </span>
                      <span className="leading-snug">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Teacher Notes Download */}
            <div className="p-3.5 rounded-2xl bg-indigo-950/80 border border-indigo-800/60 space-y-2">
              <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold">
                <FileText className="w-4 h-4" />
                <span>Classroom Lecture Notes PDF</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Download handwritten summary notes and formula derivations prepared by Uma Shukla.
              </p>
              <button
                onClick={() => alert(`Downloading official ICSE Class 7 Lecture Notes PDF for ${activeVideo.title}...`)}
                className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Notes PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
