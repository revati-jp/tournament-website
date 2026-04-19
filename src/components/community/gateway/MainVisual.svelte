<script lang="ts">
	// スライドの型定義
	// 順番の変更は、このコンポーネントに渡す slides 配列を変更するだけで可能
	interface VideoSlide {
		type: 'video';
		src: string;
	}

	interface ImageSlide {
		type: 'image';
		src: string;
		alt: string;
		/** 次のスライドに遷移するまでの表示時間（ミリ秒） */
		duration: number;
	}

	type Slide = VideoSlide | ImageSlide;

	interface Props {
		slides: Slide[];
	}

	let { slides }: Props = $props();

	let activeIndex = $state(0);
	let isPlaying = $state(true);
	let advanceTimer: ReturnType<typeof setTimeout> | undefined;
	let playbackRetryTimer: ReturnType<typeof setTimeout> | undefined;
	let playRequestId = 0;
	let blockedByAutoplay = $state(false);
	// bind:this で必要なインデックスが順次埋まるため、初期サイズは固定しない
	const videoRefs: (HTMLVideoElement | null)[] = [];

	// --max-vh001: アドレスバー等を考慮した最大ビューポート高さの 1%
	$effect(() => {
		let maxVh = 0;
		function updateMaxVh() {
			const vh = window.innerHeight;
			if (vh > maxVh) {
				maxVh = vh;
				document.documentElement.style.setProperty('--max-vh001', `${maxVh * 0.01}px`);
			}
		}
		updateMaxVh();
		window.addEventListener('resize', updateMaxVh);
		return () => window.removeEventListener('resize', updateMaxVh);
	});

	// activeIndex が変わったときにスライドの再生を制御する
	$effect(() => {
		// activeIndex を参照して依存関係を確立
		const idx = activeIndex;
		const playing = isPlaying;
		blockedByAutoplay = false;

		// 他の動画を停止・リセット
		videoRefs.forEach((video, i) => {
			if (video !== null && video !== undefined && i !== idx) {
				video.pause();
				video.currentTime = 0;
			}
		});

		const slide = slides[idx];
		if (slide.type === 'video') {
			if (playing) {
				requestVideoPlayback(idx, true);
			}
			// 動画スライドではタイマーを設定しない（ended イベントで次へ遷移）
		} else if (playing) {
			scheduleNext(slide.duration);
		}

		return () => {
			clearTimer();
			clearPlaybackRetryTimer();
		};
	});

	// 自動再生が拒否された場合、最初のユーザー操作で再試行する
	$effect(() => {
		const idx = activeIndex;
		const playing = isPlaying;
		const blocked = blockedByAutoplay;
		const slide = slides[idx];

		if (!blocked || !playing || slide.type !== 'video') return;

		const retryOnGesture = () => {
			if (!isPlaying || activeIndex !== idx) return;

			blockedByAutoplay = false;
			requestVideoPlayback(idx, false);
		};

		window.addEventListener('pointerdown', retryOnGesture, { once: true });
		window.addEventListener('keydown', retryOnGesture, { once: true });

		return () => {
			window.removeEventListener('pointerdown', retryOnGesture);
			window.removeEventListener('keydown', retryOnGesture);
		};
	});

	function scheduleNext(delay: number) {
		clearTimer();
		advanceTimer = setTimeout(() => {
			goToNext();
		}, delay);
	}

	function clearTimer() {
		if (advanceTimer !== undefined) {
			clearTimeout(advanceTimer);
			advanceTimer = undefined;
		}
	}

	function clearPlaybackRetryTimer() {
		if (playbackRetryTimer !== undefined) {
			clearTimeout(playbackRetryTimer);
			playbackRetryTimer = undefined;
		}
	}

	function goToNext() {
		blockedByAutoplay = false;
		clearPlaybackRetryTimer();
		activeIndex = (activeIndex + 1) % slides.length;
	}

	function goToSlide(index: number) {
		blockedByAutoplay = false;
		clearPlaybackRetryTimer();
		activeIndex = index;
	}

	function requestVideoPlayback(index: number, resetPosition: boolean) {
		const video = videoRefs[index];
		if (video === null || video === undefined) {
			return;
		}

		clearPlaybackRetryTimer();

		if (resetPosition) {
			video.currentTime = 0;
		}

		const requestId = ++playRequestId;
		const playPromise = video.play();
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					if (requestId !== playRequestId) {
						return;
					}

					blockedByAutoplay = false;
				})
				.catch((error: unknown) => {
					console.warn('動画の再生に失敗:', error);

					// 最新の再生要求だけを失敗扱いし、該当スライドの状態を更新する
					if (requestId !== playRequestId) {
						return;
					}

					if (!isPlaying || activeIndex !== index) {
						return;
					}

					if (error instanceof DOMException && error.name === 'NotAllowedError') {
						blockedByAutoplay = true;
						return;
					}

					if (error instanceof DOMException && error.name === 'AbortError') {
						playbackRetryTimer = setTimeout(() => {
							if (!isPlaying || activeIndex !== index) {
								return;
							}

							requestVideoPlayback(index, false);
						}, 200);
						return;
					}

					goToNext();
				});
		}
	}

	function handleVideoEnded(index: number) {
		if (index === activeIndex && isPlaying) {
			goToNext();
		}
	}

	function handleVideoLoadedData(index: number) {
		if (index !== activeIndex || !isPlaying) {
			return;
		}

		const video = videoRefs[index];
		if (video !== null && video !== undefined && video.paused) {
			requestVideoPlayback(index, false);
		}
	}

	function togglePlayback() {
		if (isPlaying) {
			// 一時停止
			isPlaying = false;
			blockedByAutoplay = false;
			clearTimer();
			clearPlaybackRetryTimer();
			const slide = slides[activeIndex];
			if (slide.type === 'video') {
				const video = videoRefs[activeIndex];
				if (video !== null && video !== undefined) {
					video.pause();
				}
			}
		} else {
			// 再生再開
			isPlaying = true;
			// $effect が isPlaying の変化を検知して再生を再開する
		}
	}
</script>

<section class="main-visual" aria-label="メインビジュアル">
	<!-- スライド -->
	<div class="slides-container">
		{#each slides as slide, index}
			<div
				class="slide"
				class:active={index === activeIndex}
				class:video={slide.type === 'video'}
				aria-hidden={index !== activeIndex ? 'true' : undefined}
				inert={index !== activeIndex ? true : undefined}
			>
				{#if slide.type === 'video'}
					<video
						bind:this={videoRefs[index]}
						src={slide.src}
						muted
						playsinline
						preload="auto"
						onloadeddata={() => handleVideoLoadedData(index)}
						onended={() => handleVideoEnded(index)}
						tabindex="-1"
					></video>
				{:else}
					<img src={slide.src} alt={slide.alt} />
				{/if}
			</div>
		{/each}
	</div>

	<!-- オーバーレイ: テキスト・ボタン・インジケーター -->
	<div class="overlay">
		<div class="overlay-bottom">
			<button
				class="play-pause-btn"
				onclick={togglePlayback}
				aria-label={isPlaying ? 'カルーセルを一時停止' : 'カルーセルを再生'}
			>
				{#if isPlaying}
					<!-- 一時停止アイコン -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<rect x="5" y="3" width="5" height="18" rx="1" />
						<rect x="14" y="3" width="5" height="18" rx="1" />
					</svg>
				{:else}
					<!-- 再生アイコン -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<polygon points="6,3 20,12 6,21" />
					</svg>
				{/if}
			</button>

			<div class="overlay-info">
				<p class="tagline">まだ見ぬ才能に、輝きの場を ―――</p>
				<p class="date">
					<time datetime="2026-05-05">2026.5.5</time>
					<span class="day">(Tue)</span>
					<span class="separator">-</span>
					<time datetime="2026-05-06">5.6</time>
					<span class="day">(Wed)</span>
				</p>
				<div class="indicators" role="group" aria-label="スライド切り替え">
					{#each slides as _, index}
						<button
							class="indicator"
							class:active={index === activeIndex}
							onclick={() => goToSlide(index)}
							aria-current={index === activeIndex ? 'true' : undefined}
							aria-label={`スライド ${index + 1}`}
						></button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	// 暗転フェードの設定
	$fade-out-duration: 0.6s;
	$fade-in-duration: 0.7s;
	$fade-in-delay: 0.25s;

	.main-visual {
		position: relative;
		// .inner コンテナからはみ出して画面幅いっぱいにする
		width: 100vw;
		margin-left: calc(-50vw + 50%);
		// main の padding-top 分を引き上げてヘッダー裏まで到達させる
		margin-top: calc(-1 * commGateway.$header-height);
		// 最大ビューポート高さを使用（--max-vh001 は JS で設定、フォールバックは 100vh）
		height: calc(var(--max-vh001, 1vh) * 100);
		overflow: hidden;
		background-color: commGateway.$color-background;
		// メインビジュアル直後のセクションとの余白
		margin-bottom: 2rem;
	}

	.slides-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.slide {
		position: absolute;
		inset: 0;
		opacity: 0;
		// フェードアウト: 遅延なしで即座に透明に
		transition: opacity $fade-out-duration ease-out 0s;

		&.active {
			// フェードイン: 少し遅延させて暗転の瞬間を作る
			opacity: 1;
			transition: opacity $fade-in-duration ease-in $fade-in-delay;
		}

		video,
		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			user-select: none;
			pointer-events: none;
		}

		&.video::after {
			content: '';
			position: absolute;
			inset: 0;
			background:
				radial-gradient(circle at center, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0.45) 100%),
				rgba(0, 0, 0, 0.28);
			pointer-events: none;
		}
	}

	// オーバーレイ: スライドの上にテキストやコントロールを配置
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 46px;
		z-index: 1;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.overlay-bottom {
		display: flex;
		align-items: flex-end;
		padding: 2rem 2.5rem;
		gap: 1rem;
		pointer-events: auto;

		&::after {
			content: '';
			width: 44px;
			height: 44px;
			flex-shrink: 0;
		}
	}

	.play-pause-btn {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;
		width: 44px;
		height: auto;
		background: none;
		border: none;
		color: commGateway.$color-text;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		opacity: 0.85;
		transition: opacity 0.2s ease;
		filter: drop-shadow(0 0 12px black);

		&:hover,
		&:focus-visible {
			opacity: 1;
		}
	}

	svg {
		scale: 1.5;
	}

	.overlay-info {
		flex: 1;
		text-align: center;
		padding-bottom: 0.3rem;
	}

	.tagline {
		@include commGateway.font-noto-sans-jp-400;
		font-size: 1.4rem;
		margin: 0 0 0.3rem;
		color: commGateway.$color-text;
		text-shadow:
			0 0 20px rgba(0, 0, 0, 0.7),
			0 0 40px rgba(0, 0, 0, 0.5),
			0 2px 8px rgba(0, 0, 0, 0.6);
		letter-spacing: 0.15em;
	}

	.date {
		@include commGateway.font-sofia-sans-extra-condensed-800;
		font-size: 3.5rem;
		margin: 0 0 0.6rem;
		color: commGateway.$color-text;
		text-shadow:
			0 0 20px rgba(0, 0, 0, 0.7),
			0 0 40px rgba(0, 0, 0, 0.5),
			0 2px 8px rgba(0, 0, 0, 0.6);
		letter-spacing: 0.04em;

		time {
			font-size: 1.2em;
		}

		.separator {
			margin-inline: 0.2em;
		}
	}

	.indicators {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.indicator {
		width: 3rem;
		height: 5px;
		border: none;
		border-radius: 2px;
		background-color: rgba(commGateway.$color-text, 0.35);
		cursor: pointer;
		padding: 0;
		transition: background-color 0.3s ease;
		-webkit-tap-highlight-color: transparent;

		&.active {
			background-color: rgba(commGateway.$color-text, 0.9);
		}

		&:hover,
		&:focus-visible {
			background-color: rgba(commGateway.$color-text, 0.7);
		}
	}

	@include sp {
		.overlay {
			bottom: 18px;
		}

		.overlay-bottom {
			padding: 1.5rem 1.2rem;
		}

		.play-pause-btn {
			width: 24px;
		}

		.tagline {
			font-size: 0.85rem;
		}

		.date {
			font-size: 1.6rem;
		}
	}
</style>
