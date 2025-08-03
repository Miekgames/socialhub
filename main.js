import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, User, Plus, Search, Home, Bell, Mail, Play, Pause, Volume2, VolumeX, Settings, Camera, Video, Smile, Send, X, MoreHorizontal, Edit, Trash2, Save, Moon, Sun, Palette, Upload, Image } from 'lucide-react';

const SocialMediaApp = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [currentUser, setCurrentUser] = useState({ username: '', displayName: '', avatar: '😊' });
  const [activeTab, setActiveTab] = useState('home');
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [showPostOptions, setShowPostOptions] = useState(null);
  const [showUserSetup, setShowUserSetup] = useState(true);
  const [setupUsername, setSetupUsername] = useState('');
  const [setupDisplayName, setSetupDisplayName] = useState('');
  const [setupAvatar, setSetupAvatar] = useState('😊');
  const [darkMode, setDarkMode] = useState(false);
  const [themeColor, setThemeColor] = useState('purple');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [showFeelingPicker, setShowFeelingPicker] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const availableAvatars = ['😊', '🙂', '😎', '🤓', '😄', '🥳', '🤗', '😇', '🤠', '🧠', '💪', '🎨', '🎵', '📸', '🏆', '🌟', '🔥', '💎', '🚀', '🎯'];
  
  const feelings = [
    { emoji: '😊', text: 'happy' },
    { emoji: '😢', text: 'sad' },
    { emoji: '😡', text: 'angry' },
    { emoji: '😍', text: 'loved' },
    { emoji: '🤔', text: 'thoughtful' },
    { emoji: '😴', text: 'tired' },
    { emoji: '🎉', text: 'excited' },
    { emoji: '😌', text: 'blessed' },
    { emoji: '🤯', text: 'mind blown' },
    { emoji: '💪', text: 'motivated' }
  ];

  const themeColors = [
    { name: 'purple', from: 'from-purple-600', to: 'to-pink-600', bg: 'bg-purple-600' },
    { name: 'blue', from: 'from-blue-600', to: 'to-cyan-600', bg: 'bg-blue-600' },
    { name: 'green', from: 'from-green-600', to: 'to-emerald-600', bg: 'bg-green-600' },
    { name: 'orange', from: 'from-orange-600', to: 'to-red-600', bg: 'bg-orange-600' },
    { name: 'pink', from: 'from-pink-600', to: 'to-rose-600', bg: 'bg-pink-600' },
    { name: 'indigo', from: 'from-indigo-600', to: 'to-purple-600', bg: 'bg-indigo-600' }
  ];

  const getCurrentTheme = () => themeColors.find(t => t.name === themeColor) || themeColors[0];

  const handleUserSetup = () => {
    if (setupUsername.trim() && setupDisplayName.trim()) {
      setCurrentUser({
        username: setupUsername.trim(),
        displayName: setupDisplayName.trim(),
        avatar: setupAvatar
      });
      setShowUserSetup(false);
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleShare = (postId) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      // Simulate sharing functionality
      navigator.clipboard.writeText(`Check out this post by @${post.username}: "${post.content}"`);
      
      setPosts(posts.map(p => 
        p.id === postId 
          ? { 
              ...p, 
              shared: !p.shared, 
              shares: p.shared ? p.shares - 1 : p.shares + 1 
            }
          : p
      ));
      
      // Show feedback
      const button = document.querySelector(`[data-share="${postId}"]`);
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPostImage(e.target.result);
        setShowImageUpload(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (newPost.trim() || postImage) {
      const post = {
        id: Date.now(),
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatar: currentUser.avatar,
        content: newPost,
        feeling: selectedFeeling,
        image: postImage,
        timestamp: 'now',
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        shared: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setSelectedFeeling('');
      setPostImage(null);
    }
  };

  const handleEditPost = (postId) => {
    const post = posts.find(p => p.id === postId);
    if (post && post.username === currentUser.username) {
      setEditingPost(postId);
      setEditContent(post.content);
      setShowPostOptions(null);
    }
  };

  const handleSaveEdit = () => {
    if (editContent.trim()) {
      setPosts(posts.map(post => 
        post.id === editingPost 
          ? { ...post, content: editContent, edited: true }
          : post
      ));
      setEditingPost(null);
      setEditContent('');
    }
  };

  const handleDeletePost = (postId) => {
    const post = posts.find(p => p.id === postId);
    if (post && post.username === currentUser.username) {
      setPosts(posts.filter(p => p.id !== postId));
      setShowPostOptions(null);
    }
  };

  const getTimeAgo = (timestamp) => {
    if (timestamp === 'now') return 'now';
    return timestamp;
  };

  const Post = ({ post }) => (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border mb-4 overflow-hidden hover:shadow-md transition-shadow`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getCurrentTheme().from} ${getCurrentTheme().to} flex items-center justify-center text-white font-semibold mr-3`}>
              {post.avatar}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{post.displayName}</h3>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>@{post.username}</span>
                {post.feeling && (
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    is feeling {post.feeling.text} {post.feeling.emoji}
                  </span>
                )}
                {post.edited && (
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>(edited)</span>
                )}
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{getTimeAgo(post.timestamp)}</p>
            </div>
          </div>
          
          {post.username === currentUser.username && (
            <div className="relative">
              <button 
                onClick={() => setShowPostOptions(showPostOptions === post.id ? null : post.id)}
                className={`p-2 ${darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} rounded-full transition-colors`}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              
              {showPostOptions === post.id && (
                <div className={`absolute right-0 top-10 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} rounded-lg shadow-lg border py-2 z-10 min-w-32`}>
                  <button 
                    onClick={() => handleEditPost(post.id)}
                    className={`w-full px-4 py-2 text-left ${darkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-50'} flex items-center space-x-2`}
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={() => handleDeletePost(post.id)}
                    className={`w-full px-4 py-2 text-left text-red-600 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-red-50'} flex items-center space-x-2`}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {editingPost === post.id ? (
          <div className="mb-4">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className={`w-full p-3 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 focus:border-transparent`}
              rows="3"
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button 
                onClick={() => {setEditingPost(null); setEditContent('');}}
                className={`px-4 py-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg transition-colors`}
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveEdit}
                className={`px-4 py-2 bg-gradient-to-r ${getCurrentTheme().from} ${getCurrentTheme().to} text-white rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2`}
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <p className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} leading-relaxed`}>{post.content}</p>
            {post.image && (
              <div className="mt-3 rounded-lg overflow-hidden">
                <img src={post.image} alt="Post content" className="w-full h-auto max-h-96 object-cover" />
              </div>
            )}
          </div>
        )}
        
        <div className={`flex items-center justify-between pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <button 
            onClick={() => handleLike(post.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              post.liked 
                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                : `${darkMode ? 'text-gray-400 hover:text-red-500 hover:bg-gray-700' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'}`
            }`}
          >
            <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
            <span className="font-medium">{post.likes}</span>
          </button>
          
          <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${darkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'}`}>
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">{post.comments}</span>
          </button>
          
          <button 
            onClick={() => handleShare(post.id)}
            data-share={post.id}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              post.shared 
                ? 'text-green-500 bg-green-50 hover:bg-green-100' 
                : `${darkMode ? 'text-gray-400 hover:text-green-400 hover:bg-gray-700' : 'text-gray-500 hover:text-green-500 hover:bg-green-50'}`
            }`}
          >
            <Share className="w-5 h-5" />
            <span className="font-medium">{post.shares}</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (showUserSetup) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-100 to-pink-100'} flex items-center justify-center p-4`}>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 max-w-md w-full`}>
          <div className="text-center mb-6">
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${getCurrentTheme().from} ${getCurrentTheme().to} bg-clip-text text-transparent mb-2`}>
              Welcome to SocialHub
            </h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Set up your profile to get started</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>Username</label>
              <input
                type="text"
                value={setupUsername}
                onChange={(e) => setSetupUsername(e.target.value)}
                placeholder="your_username"
                className={`w-full p-3 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 focus:border-transparent`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>Display Name</label>
              <input
                type="text"
                value={setupDisplayName}
                onChange={(e) => setSetupDisplayName(e.target.value)}
                placeholder="Your Name"
                className={`w-full p-3 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 focus:border-transparent`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Choose Avatar</label>
              <div className="grid grid-cols-10 gap-2">
                {availableAvatars.map(avatar => (
                  <button
                    key={avatar}
                    onClick={() => setSetupAvatar(avatar)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${
                      setupAvatar === avatar 
                        ? `border-${themeColor}-500 ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}` 
                        : `${darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-purple-300'}`
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleUserSetup}
              disabled={!setupUsername.trim() || !setupDisplayName.trim()}
              className={`w-full py-3 bg-gradient-to-r ${getCurrentTheme().from} ${getCurrentTheme().to} text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex`}>
      {/* Left Sidebar */}
      <div className={`w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-lg border-r fixed h-full z-20`}>
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h1 className={`text-2xl font-bold bg-gradient-to-r ${getCurrentTheme().from} ${getCurrentTheme().to} bg-clip-text text-transparent`}>
            SocialHub
          </h1>
        </div>
        
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('home')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'home' 
                ? `${darkMode ? 'bg-gray-700 text-white' : `bg-${themeColor}-50 text-${themeColor}-600`}` 
                : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'profile' 
                ? `${darkMode ? 'bg-gray-700 text-white' : `bg-${themeColor}-50 text-${themeColor}-600`}` 
                : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`
            }`}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'notifications' 
                ? `${darkMode ? 'bg-gray-700 text-white' : `bg-${themeColor}-50 text-${themeColor}-600`}` 
                : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="font-medium">Notifications</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'messages' 
                ? `${darkMode ? 'bg-gray-700 text-white' : `bg-${themeColor}-50 text-${themeColor}-600`}` 
                : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`
            }`}
          >
            <Mail className="w-5 h-5" />
            <span className="font-medium">Messages</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'settings' 
                ? `${darkMode ? 'bg-gray-700 text-white' : `bg-${themeColor}-50 text-${themeColor}-600`}` 
                : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className={`flex items-center space-x-3 p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getCurrentTheme().from} ${getCurrentTheme().to} flex items-center justify-center text-white font-semibold`}>
              {currentUser.avatar}
            </div>
            <div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentUser.displayName}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>@{currentUser.username}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b sticky top-0 z-10`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} capitalize`}>
                {activeTab}
              </h2>
              
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className={`w-full pl-10 pr-4 py-2 ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900'} rounded-full focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 ${darkMode ? 'focus:bg-gray-600' : 'focus:bg-white'} transition-colors`}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button 
                    onClick={() => setShowThemeMenu(!showThemeMenu)}
                    className={`p-2 ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'} rounded-full transition-colors`}
                  >
                    <Palette className="w-6 h-6" />
                  </button>
                  
                  {showThemeMenu && (
                    <div className={`absolute right-0 top-12 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} rounded-lg shadow-lg border p-4 z-20 min-w-48`}>
                      <div className="space-y-3">
                        <div>
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Theme</p>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setDarkMode(false)}
                              className={`p-2 rounded-lg ${!darkMode ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:bg-gray-600'}`}
                            >
                              <Sun className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => setDarkMode(true)}
                              className={`p-2 rounded-lg ${darkMode ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
                            >
                              <Moon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Colors</p>
                          <div className="grid grid-cols-3 gap-2">
                            {themeColors.map(color => (
                              <button
                                key={color.name}
                                onClick={() => setThemeColor(color.name)}
                                className={`w-8 h-8 rounded-full ${color.bg} ${themeColor === color.name ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <button className={`p-2 ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'} rounded-full transition-colors`}>
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6" onClick={() => {setShowPostOptions(null); setShowThemeMenu(false);}}>
          {activeTab === 'home' && (
            <div className="max-w-2xl mx-auto">
              {/* Create Post */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-4 mb-6`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getCurrentTheme().from} ${getCurrentTheme().to} flex items-center justify-center text-white font-semibold`}>
                    {currentUser.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {selectedFeeling && (
                        <span className={`text-sm ${darkMode ? 'text-gray-300 bg-gray-700' : 'text-gray-600 bg-gray-100'} px-2 py-1 rounded-full flex items-center space-x-1`}>
                          <span>feeling {selectedFeeling.text}</span>
                          <span>{selectedFeeling.emoji}</span>
                          <button onClick={() => setSelectedFeeling('')} className="ml-1 text-gray-400 hover:text-gray-600">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                    </div>
                    
                    {postImage && (
                      <div className="mb-3 relative">
                        <img src={postImage} alt="Upload preview" className="w-full h-48 object-cover rounded-lg" />
                        <button 
                          onClick={() => setPostImage(null)}
                          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="What's on your mind?"
                      className={`w-full p-3 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'} rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 focus:border-transparent`}
                      rows="3"
                    />
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex space-x-2">
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className={`px-3 py-1 text-sm ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-purple-600'} transition-colors flex items-center space-x-1 cursor-pointer`}
                          >
                            <Camera className="w-4 h-4" />
                            <span>Photo</span>
                          </label>
                        </div>
                        
                        <button 
                          onClick={() => alert('Video upload coming soon!')}
                          className={`px-3 py-1 text-sm ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-purple-600'} transition-colors flex items-center space-x-1`}
                        >
                          <Video className="w-4 h-4" />
                          <span>Video</span>
                        </button>
                        
                        <div className="relative">
                          <button 
                            onClick={() => setShowFeelingPicker(!showFeelingPicker)}
                            className={`px-3 py-1 text-sm ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-purple-600'} transition-colors flex items-center space-x-1`}
                          >
                            <Smile className="w-4 h-4" />
                            <span>Feeling</span>
                          </button>
                          
                          {showFeelingPicker && (
                            <div className={`absolute bottom-full left-0 mb-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} rounded-lg shadow-lg border p-3 z-10 grid grid-cols-5 gap-2 min-w-64`}>
                              {feelings.map(feeling => (
                                <button
                                  key={feeling.text}
                                  onClick={() => {
                                    setSelectedFeeling(feeling);
                                    setShowFeelingPicker(false);
                                  }}
                                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} transition-colors text-center`}
                                  title={feeling.text}
                                >
                                  <div className="text-lg">{feeling.emoji}</div>
                                  <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feeling.text}</div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={handlePost}
                        disabled={!newPost.trim() && !postImage}
                        className={`px-6 py-2 bg-gradient-to-r ${getCurrentTheme().from} ${getCurrentTheme().to} text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts Feed */}
              {posts.length === 0 ? (
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-12 text-center`}>
                  <div className={`w-16 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <MessageCircle className={`w-8 h-8 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>No posts yet</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} mb-4`}>Be the first to share something with the community!</p>
                  <button 
                    onClick={() => document.querySelector('textarea').focus()}
                    className={`px-6 py-2 bg-gradient-to-r ${getCurrentTheme().from} ${getCurrentTheme().to} text-white rounded-lg font-medium hover:opacity-90 transition-colors`}
                  >
                    Create First Post
                  </button>
                </div>
              ) : (
                <div>
                  {posts.map(post => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-2xl mx-auto">
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-8 text-center`}>
                <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${getCurrentTheme().from} ${getCurrentTheme().to} flex items-center justify-center text-white text-3xl font-semibold mx-auto mb-4`}>
                  {currentUser.avatar}
                </div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{currentUser.displayName}</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>@{currentUser.username}</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{posts.filter(p => p.username === currentUser.username).length}</p>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Posts</p>
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>0</p>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Followers</p>
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>0</p>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Following</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="max-w-2xl mx-auto">
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-8 text-center`}>
                <Bell className={`w-16 h-16 ${darkMode ? 'text-gray-400' : 'text-gray-400'} mx-auto mb-4`} />
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>No new notifications</h2>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>You're all caught up! Check back later for updates.</p>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="max-w-2xl mx-auto">
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-8 text-center`}>
                <Mail className={`w-16 h-16 ${darkMode ? 'text-gray-400' : 'text-gray-400'} mx-auto mb-4`} />
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>No messages yet</h2>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Start a conversation with your friends!</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Theme Settings */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-6`}>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Appearance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Toggle between light and dark theme</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setDarkMode(false)}
                        className={`p-2 rounded-lg ${!darkMode ? 'bg-yellow-100 text-yellow-600' : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'}`}`}
                      >
                        <Sun className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setDarkMode(true)}
                        className={`p-2 rounded-lg ${darkMode ? 'bg-blue-100 text-blue-600' : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'}`}`}
                      >
                        <Moon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Theme Color</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Choose your preferred color scheme</p>
                    </div>
                    <div className="flex space-x-2">
                      {themeColors.map(color => (
                        <button
                          key={color.name}
                          onClick={() => setThemeColor(color.name)}
                          className={`w-8 h-8 rounded-full ${color.bg} ${themeColor === color.name ? 'ring-2 ring-offset-2 ring-gray-400' : ''} hover:scale-110 transition-transform`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Account Settings */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-6`}>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Account Settings</h3>
                <div className="space-y-4">
                  <div className={`flex items-center justify-between py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Display Name</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser.displayName}</p>
                    </div>
                    <button className={`text-${themeColor}-600 hover:text-${themeColor}-700 font-medium`}>Edit</button>
                  </div>
                  <div className={`flex items-center justify-between py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Username</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>@{currentUser.username}</p>
                    </div>
                    <button className={`text-${themeColor}-600 hover:text-${themeColor}-700 font-medium`}>Edit</button>
                  </div>
                  <div className={`flex items-center justify-between py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Avatar</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser.avatar}</p>
                    </div>
                    <button className={`text-${themeColor}-600 hover:text-${themeColor}-700 font-medium`}>Change</button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Privacy</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your privacy settings</p>
                    </div>
                    <button className={`text-${themeColor}-600 hover:text-${themeColor}-700 font-medium`}>Manage</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaApp;
