/**
 * 表示テーマ（ライト / ダーク / 端末に合わせる）。
 * 選択は localStorage に保存し、<html data-theme="light|dark"> で適用する。
 * 「端末に合わせる」は属性なし＝ globals.css の prefers-color-scheme に任せる。
 */
export type ThemeChoice = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "o-theme";

/**
 * <head> で描画前に同期実行する小さなスクリプト。
 * 保存済みの選択があれば data-theme を付け、誤ったテーマの一瞬表示を防ぐ。
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
