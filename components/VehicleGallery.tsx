"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronLeft,
	ChevronRight,
	Maximize2,
	Pause,
	Play,
	X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
// Removed swiper dependency to avoid install issues, using native buttons/framer

interface GalleryImage {
	url: string;
	thumb: string;
	alt: string;
}

interface VehicleGalleryProps {
	images: GalleryImage[];
	title: string;
}

export default function VehicleGallery({ images, title }: VehicleGalleryProps) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);

	const handleNext = useCallback(() => {
		setSelectedIndex((prev) => (prev + 1) % images.length);
	}, [images.length]);

	const handlePrev = useCallback(() => {
		setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
	}, [images.length]);

	// Auto-play logic
	useEffect(() => {
		let interval: NodeJS.Timeout | undefined;
		if (isPlaying && !isLightboxOpen) {
			interval = setInterval(() => {
				handleNext();
			}, 5000); // 5 seconds slide duration
		}
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [handleNext, isLightboxOpen, isPlaying, selectedIndex]); // Depend on selectedIndex to reset timer on manual change

	const selectImage = (index: number) => {
		setSelectedIndex(index);
		// Optional: pause on manual interaction?
		// setIsPlaying(false);
	};

	const toggleLightbox = () => setIsLightboxOpen(!isLightboxOpen);

	// Keyboard navigation for lightbox
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isLightboxOpen) return;
			if (e.key === "ArrowRight") handleNext();
			if (e.key === "ArrowLeft") handlePrev();
			if (e.key === "Escape") setIsLightboxOpen(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isLightboxOpen, handleNext, handlePrev]);

	if (!images || images.length === 0) {
		return (
			<div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
				No Images Available
			</div>
		);
	}

	return (
		<div className="space-y-4 select-none">
			{/* Main Stage */}
			<div
				className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-900 shadow-lg group"
				onMouseEnter={() => setIsPlaying(false)}
				onMouseLeave={() => setIsPlaying(true)}
			>
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={selectedIndex}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4 }}
						className="relative w-full h-full cursor-zoom-in"
						onClick={toggleLightbox}
					>
						<Image
							src={images[selectedIndex].url}
							alt={
								images[selectedIndex].alt ||
								`${title} - Image ${selectedIndex + 1}`
							}
							fill
							className="object-cover"
							priority={true}
							sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 840px"
						/>
					</motion.div>
				</AnimatePresence>

				{/* Controls Overlay (visible on hover or focus) */}
				<div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
					<div className="text-white text-sm font-medium">
						{selectedIndex + 1} / {images.length}
					</div>
					<div className="flex gap-2">
						<button
							onClick={(e) => {
								e.stopPropagation();
								setIsPlaying(!isPlaying);
							}}
							className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition"
							title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
						>
							{isPlaying ? <Pause size={18} /> : <Play size={18} />}
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								toggleLightbox();
							}}
							className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition"
							title="Fullscreen"
						>
							<Maximize2 size={18} />
						</button>
					</div>
				</div>

				{/* Navigation Arrows */}
				<button
					onClick={(e) => {
						e.stopPropagation();
						handlePrev();
					}}
					className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition opacity-0 group-hover:opacity-100"
				>
					<ChevronLeft size={24} />
				</button>
				<button
					onClick={(e) => {
						e.stopPropagation();
						handleNext();
					}}
					className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition opacity-0 group-hover:opacity-100"
				>
					<ChevronRight size={24} />
				</button>
			</div>

			{/* Thumbnails (Scrollable Strip) */}
			<div className="relative">
				<div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
					{images.map((img, idx) => (
						<button
							key={idx}
							onClick={() => selectImage(idx)}
							className={`relative flex-shrink-0 w-24 aspect-[4/3] rounded-lg overflow-hidden transition-all duration-300 snap-start ${
								selectedIndex === idx
									? "ring-2 ring-brand-primary ring-offset-2 opacity-100"
									: "opacity-60 hover:opacity-100"
							}`}
						>
							<Image
								src={img.thumb || img.url}
								alt={`Thumb ${idx}`}
								fill
								className="object-cover"
								sizes="120px"
							/>
						</button>
					))}
				</div>
			</div>

			{/* Lightbox Modal */}
			<AnimatePresence>
				{isLightboxOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
						onClick={() => setIsLightboxOpen(false)}
					>
						<button
							className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition z-50"
							onClick={() => setIsLightboxOpen(false)}
						>
							<X size={32} />
						</button>

						<motion.div
							className="relative w-full h-full max-w-7xl max-h-[90vh]"
							onClick={(e) => e.stopPropagation()}
						>
							<Image
								src={images[selectedIndex].url}
								alt={images[selectedIndex].alt}
								fill
								className="object-contain"
								quality={100}
								priority
							/>

							<button
								onClick={handlePrev}
								className="absolute left-0 top-1/2 -translate-y-1/2 p-4 text-white hover:text-brand-primary transition"
							>
								<ChevronLeft size={48} />
							</button>
							<button
								onClick={handleNext}
								className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-white hover:text-brand-primary transition"
							>
								<ChevronRight size={48} />
							</button>
						</motion.div>

						<div className="absolute bottom-6 flex gap-2 overflow-x-auto max-w-[90vw] p-2 bg-black/50 rounded-xl backdrop-blur-sm">
							{images.map((img, idx) => (
								<button
									key={idx}
									onClick={(e) => {
										e.stopPropagation();
										selectImage(idx);
									}}
									className={`relative w-16 aspect-square rounded-md overflow-hidden transition ${
										selectedIndex === idx
											? "opacity-100 ring-2 ring-white"
											: "opacity-40 hover:opacity-100"
									}`}
								>
									<Image
										src={img.thumb || img.url}
										alt=""
										fill
										className="object-cover"
									/>
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
