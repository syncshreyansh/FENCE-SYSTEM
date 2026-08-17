import { memo } from 'react';
import './Aurora.css';

const Aurora = memo(function Aurora() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '60%',
        height: '60%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,25,50,0.4) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'auroraFloat1 25s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        right: '-5%',
        width: '50%',
        height: '55%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(10,22,40,0.35) 0%, transparent 70%)',
        filter: 'blur(90px)',
        animation: 'auroraFloat2 30s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '20%',
        width: '40%',
        height: '40%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,14,14,0.25) 0%, transparent 70%)',
        filter: 'blur(100px)',
        animation: 'auroraFloat3 20s ease-in-out infinite',
      }} />
    </div>
  );
});

export default Aurora;
