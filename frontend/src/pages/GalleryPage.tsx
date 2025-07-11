import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Clock, 
  Calendar, 
  Play, 
  Heart, 
  Eye, 
  ChevronDown,
  Grid3X3,
  List,
  Sparkles,
  X,
  Users,
  User,
  Globe,
  Lock
} from 'lucide-react';
import Header from '../components/Header';
import BackgroundElements from '../components/BackgroundElements';

interface VideoData {
  id: string;
  title: string;
  prompt: string;
  description: string;
  duration: string;
  createdAt: string;
  thumbnail: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  videoUrl: string;
  author: string;
  isPublic: boolean;
  isOwn?: boolean;
}

// Sample video data with user-specific and community videos
const sampleVideos: VideoData[] = [
  // User's own videos
  {
    id: 'user-1',
    title: 'My Pythagorean Theorem',
    prompt: 'Create an animated proof of the Pythagorean theorem with visual squares',
    description: 'My personal take on visualizing the Pythagorean theorem with animated squares.',
    duration: '2:34',
    createdAt: '2024-01-15',
    thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Geometry',
    tags: ['theorem', 'geometry', 'proof'],
    views: 45,
    likes: 8,
    videoUrl: '/videos/pythagorean.mp4',
    author: 'You',
    isPublic: true,
    isOwn: true
  },
  {
    id: 'user-2',
    title: 'Private Calculus Study',
    prompt: 'Explain derivatives with tangent line animations',
    description: 'Personal study material for understanding derivatives.',
    duration: '3:12',
    createdAt: '2024-01-14',
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Calculus',
    tags: ['derivatives', 'calculus', 'study'],
    views: 12,
    likes: 2,
    videoUrl: '/videos/derivatives.mp4',
    author: 'You',
    isPublic: false,
    isOwn: true
  },
  // Community videos
  {
    id: '1',
    title: 'Pythagorean Theorem Visualization',
    prompt: 'Create an animated proof of the Pythagorean theorem with visual squares',
    description: 'An elegant visual proof showing how the squares of the sides relate to the hypotenuse in a right triangle.',
    duration: '2:34',
    createdAt: '2024-01-15',
    thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Geometry',
    tags: ['theorem', 'geometry', 'proof'],
    views: 1250,
    likes: 89,
    videoUrl: '/videos/pythagorean.mp4',
    author: 'MathExplorer',
    isPublic: true
  },
  {
    id: '2',
    title: 'Bubble Sort Algorithm',
    prompt: 'Visualize bubble sort algorithm with animated array elements',
    description: 'Step-by-step visualization of the bubble sort algorithm showing element comparisons and swaps.',
    duration: '3:12',
    createdAt: '2024-01-14',
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Algorithms',
    tags: ['sorting', 'algorithm', 'programming'],
    views: 2100,
    likes: 156,
    videoUrl: '/videos/bubble-sort.mp4',
    author: 'CodeVisual',
    isPublic: true
  },
  {
    id: '3',
    title: 'Matrix Multiplication',
    prompt: 'Show matrix multiplication with step-by-step calculations',
    description: 'Interactive demonstration of matrix multiplication showing the calculation process for each element.',
    duration: '4:05',
    createdAt: '2024-01-13',
    thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Linear Algebra',
    tags: ['matrix', 'multiplication', 'linear algebra'],
    views: 890,
    likes: 67,
    videoUrl: '/videos/matrix-mult.mp4',
    author: 'AlgebraGuru',
    isPublic: true
  },
  {
    id: '4',
    title: 'Fourier Transform Basics',
    prompt: 'Explain Fourier transforms with visual frequency decomposition',
    description: 'Visual explanation of how complex signals can be decomposed into simple frequency components.',
    duration: '5:23',
    createdAt: '2024-01-12',
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Signal Processing',
    tags: ['fourier', 'frequency', 'signal processing'],
    views: 3200,
    likes: 245,
    videoUrl: '/videos/fourier.mp4',
    author: 'SignalMaster',
    isPublic: true
  },
  {
    id: '5',
    title: 'Calculus Derivatives',
    prompt: 'Animate the concept of derivatives with tangent lines',
    description: 'Visual representation of derivatives showing how tangent lines approximate function behavior.',
    duration: '3:45',
    createdAt: '2024-01-11',
    thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Calculus',
    tags: ['derivatives', 'calculus', 'tangent'],
    views: 1800,
    likes: 134,
    videoUrl: '/videos/derivatives.mp4',
    author: 'CalculusKing',
    isPublic: true
  },
  {
    id: '6',
    title: 'Binary Search Tree',
    prompt: 'Visualize binary search tree operations with insertions and deletions',
    description: 'Interactive demonstration of BST operations showing tree structure changes during modifications.',
    duration: '4:18',
    createdAt: '2024-01-10',
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Data Structures',
    tags: ['tree', 'binary search', 'data structures'],
    views: 1650,
    likes: 112,
    videoUrl: '/videos/bst.mp4',
    author: 'DataStructPro',
    isPublic: true
  }
];

const categories = ['All', 'Geometry', 'Algorithms', 'Linear Algebra', 'Signal Processing', 'Calculus', 'Data Structures'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'duration', label: 'Duration' }
];

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<VideoData[]>(sampleVideos);
  const [filteredVideos, setFilteredVideos] = useState<VideoData[]>(sampleVideos);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeSection, setActiveSection] = useState<'community' | 'personal'>('community');
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 12;

  // Filter and sort videos
  useEffect(() => {
    let filtered = videos;

    // Apply section filter
    if (activeSection === 'personal') {
      filtered = filtered.filter(video => video.isOwn);
    } else {
      filtered = filtered.filter(video => video.isPublic && !video.isOwn);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'popular':
          return b.views - a.views;
        case 'duration':
          const aDuration = parseInt(a.duration.split(':')[0]) * 60 + parseInt(a.duration.split(':')[1]);
          const bDuration = parseInt(b.duration.split(':')[0]) * 60 + parseInt(b.duration.split(':')[1]);
          return aDuration - bDuration;
        default:
          return 0;
      }
    });

    setFilteredVideos(filtered);
    setCurrentPage(1);
  }, [videos, searchQuery, selectedCategory, sortBy, activeSection]);

  // Pagination
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + videosPerPage);

  const handleVideoClick = (video: VideoData) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const userVideosCount = videos.filter(v => v.isOwn).length;
  const communityVideosCount = videos.filter(v => v.isPublic && !v.isOwn).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-gray-950 background-fade">
      <BackgroundElements />
      
      <div className="fade-in-down">
        <Header />
      </div>

      <main className="relative z-10 px-4 sm:px-6 py-8 page-scroll">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="fade-in-up text-center mb-8 sm:mb-12">
            <h1 className="text-display text-3xl sm:text-4xl md:text-5xl font-light bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
              Video Gallery
            </h1>
            <p className="text-body text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Explore mathematical animations and educational videos created with AI
            </p>
          </div>

          {/* Section Toggle - New Tab Style */}
          <div className="fade-in-up delay-100 mb-8">
            <div className="flex items-center justify-center">
              <div className="relative bg-slate-950/40 backdrop-blur-sm rounded-2xl border border-emerald-900/20 p-2">
                {/* Background slider */}
                <div 
                  className={`absolute top-2 bottom-2 bg-gradient-to-r from-emerald-700/80 to-emerald-600/80 rounded-xl transition-all duration-500 ease-out shadow-lg ${
                    activeSection === 'community' 
                      ? 'left-2 right-1/2 mr-1' 
                      : 'right-2 left-1/2 ml-1'
                  }`}
                />
                
                {/* Tab buttons */}
                <div className="relative flex">
                  <button
                    onClick={() => setActiveSection('community')}
                    className={`flex items-center gap-3 px-6 sm:px-8 py-4 rounded-xl transition-all duration-300 text-sm font-medium min-w-[140px] sm:min-w-[160px] justify-center ${
                      activeSection === 'community'
                        ? 'text-white shadow-lg'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <div className="flex flex-col items-start">
                      <span className="text-ui">Community</span>
                      <span className="text-xs opacity-75">{communityVideosCount} videos</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveSection('personal')}
                    className={`flex items-center gap-3 px-6 sm:px-8 py-4 rounded-xl transition-all duration-300 text-sm font-medium min-w-[140px] sm:min-w-[160px] justify-center ${
                      activeSection === 'personal'
                        ? 'text-white shadow-lg'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <div className="flex flex-col items-start">
                      <span className="text-ui">My Videos</span>
                      <span className="text-xs opacity-75">{userVideosCount} videos</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="fade-in-up delay-200 mb-8">
            <div className="bg-slate-950/40 backdrop-blur-sm rounded-xl border border-emerald-900/20 p-4 sm:p-6">
              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeSection === 'personal' ? 'your' : 'community'} videos, prompts, or topics...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/40 border border-emerald-900/20 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-600/50 focus:border-emerald-600/50 transition-all duration-300"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-wrap gap-3 items-center">
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                          selectedCategory === category
                            ? 'bg-emerald-700/60 text-slate-100 border border-emerald-600/50'
                            : 'bg-slate-800/40 text-slate-400 border border-slate-700/30 hover:bg-slate-700/40 hover:text-slate-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-slate-800/60 border border-slate-700/30 rounded-lg px-3 py-2 pr-8 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-600/50"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-slate-800/40 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all duration-300 ${
                        viewMode === 'grid'
                          ? 'bg-emerald-700/60 text-slate-100'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all duration-300 ${
                        viewMode === 'list'
                          ? 'bg-emerald-700/60 text-slate-100'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="fade-in-up delay-300 mb-6">
            <p className="text-slate-400 text-sm">
              Showing {paginatedVideos.length} of {filteredVideos.length} {activeSection === 'personal' ? 'personal' : 'community'} videos
            </p>
          </div>

          {/* Video Grid/List */}
          <div className="fade-in-up delay-400 scrollbar-gallery">
            {paginatedVideos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-800/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeSection === 'personal' ? (
                    <User className="w-8 h-8 text-slate-400" />
                  ) : (
                    <Users className="w-8 h-8 text-slate-400" />
                  )}
                </div>
                <h3 className="text-slate-300 text-lg font-medium mb-2">
                  {activeSection === 'personal' ? 'No personal videos yet' : 'No community videos found'}
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  {activeSection === 'personal' 
                    ? 'Create your first video and publish it to see it here.'
                    : 'Try adjusting your search or filter criteria.'
                  }
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className="group bg-slate-950/40 backdrop-blur-sm rounded-xl border border-emerald-900/20 overflow-hidden hover:border-emerald-700/40 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleVideoClick(video)}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                      
                      {/* Duration and Privacy Indicator */}
                      <div className="absolute bottom-2 right-2 flex items-center gap-2">
                        {video.isOwn && (
                          <div className="bg-slate-950/80 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center gap-1">
                            {video.isPublic ? (
                              <Globe className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Lock className="w-3 h-3 text-slate-400" />
                            )}
                          </div>
                        )}
                        <div className="bg-slate-950/80 backdrop-blur-sm rounded px-2 py-1">
                          <span className="text-xs text-slate-200 text-mono">{video.duration}</span>
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-emerald-600/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-slate-200 font-medium mb-2 line-clamp-2 group-hover:text-emerald-200 transition-colors duration-300">
                        {video.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                      
                      {/* Author */}
                      <p className="text-slate-500 text-xs mb-2">
                        by {video.author}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {video.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-emerald-900/30 text-emerald-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{formatViews(video.views)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{video.likes}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(video.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className="group bg-slate-950/40 backdrop-blur-sm rounded-xl border border-emerald-900/20 p-4 hover:border-emerald-700/40 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500"
                        />
                        <div className="absolute bottom-1 right-1 bg-slate-950/80 backdrop-blur-sm rounded px-1.5 py-0.5">
                          <span className="text-xs text-slate-200 text-mono">{video.duration}</span>
                        </div>
                        {video.isOwn && (
                          <div className="absolute top-1 right-1 bg-slate-950/80 backdrop-blur-sm rounded p-1">
                            {video.isPublic ? (
                              <Globe className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Lock className="w-3 h-3 text-slate-400" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-slate-200 font-medium mb-1 group-hover:text-emerald-200 transition-colors duration-300">
                          {video.title}
                        </h3>
                        <p className="text-slate-500 text-xs mb-1">by {video.author}</p>
                        <p className="text-slate-400 text-sm mb-2 line-clamp-2 leading-relaxed">
                          {video.description}
                        </p>
                        <p className="text-slate-500 text-xs mb-2 line-clamp-1">
                          <strong>Prompt:</strong> {video.prompt}
                        </p>
                        
                        {/* Tags and Meta */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {video.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-emerald-900/30 text-emerald-300 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{formatViews(video.views)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              <span>{video.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(video.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="fade-in-up delay-500 flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-slate-800/60 border border-slate-700/30 rounded-lg text-slate-300 hover:bg-slate-700/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-emerald-700/60 text-slate-100 border border-emerald-600/50'
                        : 'bg-slate-800/60 border border-slate-700/30 text-slate-300 hover:bg-slate-700/60'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-slate-800/60 border border-slate-700/30 rounded-lg text-slate-300 hover:bg-slate-700/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="bg-slate-950/90 backdrop-blur-sm rounded-xl border border-emerald-900/20 max-w-4xl w-full max-h-[90vh] overflow-hidden modal-content">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-emerald-900/20">
              <div className="flex items-center gap-3">
                <h2 className="text-slate-200 font-medium">{selectedVideo.title}</h2>
                {selectedVideo.isOwn && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-slate-800/60 rounded-full">
                    {selectedVideo.isPublic ? (
                      <>
                        <Globe className="w-3 h-3 text-emerald-400" />
                        <span className="text-xs text-emerald-400">Public</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-400">Private</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={closeVideoModal}
                className="p-2 hover:bg-slate-800/60 rounded-lg transition-colors duration-300"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 scrollbar-modal overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Video Player Placeholder */}
              <div className="relative w-full mb-6" style={{ paddingBottom: '56.25%' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-emerald-950 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-700/80 to-slate-700/80 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-slate-100 ml-1" />
                    </div>
                    <p className="text-slate-300">Video Player</p>
                    <p className="text-slate-500 text-sm mt-1">Duration: {selectedVideo.duration}</p>
                  </div>
                </div>
              </div>

              {/* Video Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-slate-200 font-medium mb-2">Description</h3>
                  <p className="text-slate-400 leading-relaxed">{selectedVideo.description}</p>
                </div>

                <div>
                  <h3 className="text-slate-200 font-medium mb-2">Original Prompt</h3>
                  <div className="bg-slate-900/40 rounded-lg p-3 border border-emerald-900/20">
                    <p className="text-slate-300 text-sm leading-relaxed">{selectedVideo.prompt}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{selectedVideo.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedVideo.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedVideo.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{formatViews(selectedVideo.views)} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{selectedVideo.likes} likes</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-slate-200 font-medium mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-emerald-900/30 text-emerald-300 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;