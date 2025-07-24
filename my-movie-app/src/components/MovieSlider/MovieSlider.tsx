import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import type { Movie } from '../../types/types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaPlay } from 'react-icons/fa';
import './MovieSlider.css';

interface MovieSliderProps {
  movies: Movie[];
}

const MovieSlider = ({ movies }: MovieSliderProps) => {
  return (
    <div className="movie-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        speed={1000}
        loop={true}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.imdbID}>
            <div 
              className="slider-item"
              style={{ 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), url(${movie.Poster})`
              }}
            >
              <div className="slider-content">
                <motion.h2 
                  className="slider-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {movie.Title}
                </motion.h2>
                
                <div className="slider-meta">
                  <motion.span 
                    className="slider-year"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {movie.Year}
                  </motion.span>
                  
                  {movie.imdbRating && (
                    <motion.div 
                      className="slider-rating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <FaStar className="star-icon" />
                      <span>{movie.imdbRating}</span>
                    </motion.div>
                  )}
                </div>
                
                <motion.p 
                  className="slider-plot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {movie.Plot?.substring(0, 150)}...
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Link to={`/movie/${movie.imdbID}`} className="slider-button">
                    <FaPlay /> Смотреть
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlider;