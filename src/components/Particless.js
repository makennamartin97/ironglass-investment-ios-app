import React, {useCallback, useMemo} from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

//background particles animation

function Particless() {

    const options = useMemo(() => {
        return {
            fps_limit: 70,
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "attract",
        parallax: { enable: false, force: 290, smooth: 30 }
      },
      resize: true
    },
    modes: {
      push: { quantity: 1 },
      attract: { distance: 60, duration: .5, factor: 3}
    }
  },
  particles: {
    color: { value: "#03a9f4" },
    line_linked: {
      color: "#0380ca",
      distance: 190,
      enable: true,
      opacity: 1.0,
      width: 1.7
    },
    move: {
      attract: { enable: true, rotateX: 600, rotateY: 1200 },
      bounce: false,
      direction: "none",
      enable: true,
      out_mode: "out",
      random: false,
      speed: 2.2,
      straight: false
    },
    number: { density: { enable: true, value_area: 800 }, value: 80 },
    opacity: {
      anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
      random: false,
      value: 0.5
    },
    shape: {
      character: {
        fill: false,
        font: "Verdana",
        style: "",
        value: "*",
        weight: "400"
      },
      polygon: { nb_sides: 19 },
      stroke: { color: "#000000", width: 0.05 },
      type: "circle"
    },
    size: {
      anim: { enable: false, size_min: 2.9, speed: 10, sync: false },
      random: true,
      value: 3
    }
  },
  polygon: {
    draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.5},
    move: { radius: 20 },
    scale: 20,
    type: "none",
    url: ""
  },
  fullScreen: false,
  retina_detect: true
        }
    }, [])

    const particlesInit = useCallback((engine) => {
        loadSlim(engine)
    }, [])
    return (
      <div id="tsparticles">
        <Particles init={particlesInit} options={options} />
      </div>
    )
    
  }
  
  export default Particless;