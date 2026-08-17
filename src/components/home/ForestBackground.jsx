import './ForestBackground.css';

export default function ForestBackground() {
  return (
    <div className="forest-bg" aria-hidden="true">
      {/* Top darkening veil for heading legibility */}
      <div className="forest-bg__top-veil" />

      {/* Faint horizontal mist drift over the image's mist band */}
      <div className="forest-bg__mist" />

      {/* Treeline sway — duplicate image strip animated with gentle breeze */}
      <div className="forest-bg__sway forest-bg__sway--a" />
      <div className="forest-bg__sway forest-bg__sway--b" />
      <div className="forest-bg__sway forest-bg__sway--c" />

      {/* Bottom fade to black for smooth section transition */}
      <div className="forest-bg__fade" />

      {/* Firefly particles within the misty band */}
      <div className="forest-bg__firefly forest-bg__firefly--1" />
      <div className="forest-bg__firefly forest-bg__firefly--2" />
      <div className="forest-bg__firefly forest-bg__firefly--3" />
      <div className="forest-bg__firefly forest-bg__firefly--4" />
      <div className="forest-bg__firefly forest-bg__firefly--5" />
      <div className="forest-bg__firefly forest-bg__firefly--6" />
      <div className="forest-bg__firefly forest-bg__firefly--7" />
      <div className="forest-bg__firefly forest-bg__firefly--8" />
    </div>
  );
}
