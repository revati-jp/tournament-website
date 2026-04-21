<script lang="ts">
	import { BREAKPOINT_HB } from '@utils/community/gateway';

	interface NavItem {
		label: string;
		href: string;
	}

	interface SocialLink {
		label: string;
		href: string;
		size: number;
		iconImg: {
			path: string;
			width: number;
			height: number;
		};
	}

	interface Props {
		navItems: NavItem[];
		socialLinks: SocialLink[];
	}

	let { navItems, socialLinks }: Props = $props();

	let isOpen = $state(false);

	// Header 側から発火するカスタムイベントを購読してドロワーを開く
	$effect(() => {
		const handleOpen = () => {
			isOpen = true;
			// document.body.style.overflow = 'hidden'; // ドロワー展開中はスクロールを無効化
		};

		document.addEventListener('open-mobile-drawer', handleOpen);
		return () => document.removeEventListener('open-mobile-drawer', handleOpen);
	});

	// isOpen に連動してスクロール（overflow）を制御する処理
	$effect(() => {
		if (isOpen) {
			// 開く直前の overflow の状態（何も設定されていなければ空文字）を記憶
			const originalOverflow = document.body.style.overflow;

			// スクロールを無効化
			document.body.style.overflow = 'hidden';

			// クリーンアップ関数（isOpenがfalseになった時、またはコンポーネントが破棄された時に実行）
			return () => {
				document.body.style.overflow = originalOverflow;
			};
		}
	});

	// Header 側でボタンを再クリックしたときの close イベントを購読する
	$effect(() => {
		const handleClose = () => {
			isOpen = false;
		};

		document.addEventListener('close-mobile-drawer', handleClose);
		return () => document.removeEventListener('close-mobile-drawer', handleClose);
	});

	// ブレイクポイントを跨いでPC幅になったときにドロワーを閉じる
	$effect(() => {
		const mq = window.matchMedia(BREAKPOINT_HB);

		const handler = (e: MediaQueryListEvent) => {
			if (!e.matches) {
				dispatchClose();
			}
		};

		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	});

	/**
	 * ドロワーを閉じる。
	 * カスタムイベントを dispatch することで Header 側のボタン状態も同期する。
	 */
	function dispatchClose() {
		document.dispatchEvent(new CustomEvent('close-mobile-drawer'));
	}

	function handleNavClick() {
		dispatchClose();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			dispatchClose();
		}
	}
</script>

<!--
	ドロワーオーバーレイ。
	header の外側（兄弟要素）に配置されているため、
	position: fixed がビューポート基準で正しく動作する。
	top: commGateway.$header-height にすることで、ヘッダー部分を上書きせず
	元のヘッダーをそのまま表示させる。
-->
{#if isOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="drawer-overlay" onkeydown={handleKeydown}>
		<div class="drawer" role="dialog" aria-modal="true" aria-label="ナビゲーションメニュー">
			<!-- ナビゲーション -->
			<nav class="drawer-nav">
				<ul>
					{#each navItems as item}
						<li>
							<a href={item.href} onclick={handleNavClick}>
								<span>{item.label}</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polyline points="9 18 15 12 9 6" />
								</svg>
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- ソーシャルリンク（ドロワー下部） -->
			<div class="drawer-socials">
				<ul>
					{#each socialLinks as link}
						<li>
							<a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
								<img
									src={link.iconImg.path}
									alt={link.label}
									width={link.size}
									height={link.iconImg.height * (link.size / link.iconImg.width)}
								/>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	/*
	 * ドロワーオーバーレイ:
	 * - top: commGateway.$header-height にすることで、ヘッダー領域を覆わず
	 *   元のヘッダーをそのまま表示させる。
	 * - overflow: hidden でコンテンツのはみ出しを防ぐ。
	 */
	.drawer-overlay {
		position: fixed;
		top: commGateway.$header-height;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 256;
		background-color: commGateway.$color-background;
		overflow: hidden;
	}

	.drawer {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		animation: slide-in 0.3s ease;
	}

	@keyframes slide-in {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.drawer-nav {
		flex: 1;
		overflow-y: auto;
		padding: 0 16px;

		ul {
			list-style: none;
			padding: 0;
			margin: 0;
		}

		li {
			border-bottom: 1px solid rgba(commGateway.$color-text, 0.12);
		}

		a {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 18px 8px;
			color: commGateway.$color-text;
			text-decoration: none;
			font-size: 20px;
			-webkit-tap-highlight-color: transparent;
			transition: background-color 0.2s ease;
			@include commGateway.font-zalando-sans-expanded-500;

			span {
				transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
			}

			svg {
				transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
			}

			&:hover,
			&:focus-visible {
				background-color: rgba(commGateway.$color-text, 0.04);

				span {
					transform: translateX(8px);
				}

				svg {
					transform: translateX(-4px);
				}
			}

			&:active {
				background-color: rgba(commGateway.$color-text, 0.06);
			}
		}
	}

	.drawer-socials {
		flex-shrink: 0;
		padding: 24px 16px;

		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			justify-content: center;
			gap: 28px;
			align-items: center;
		}

		a {
			color: commGateway.$color-text;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 8px;
			-webkit-tap-highlight-color: transparent;
		}
	}
</style>
