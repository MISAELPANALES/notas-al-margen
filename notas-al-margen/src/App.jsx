import { useState } from 'react';
import { BookOpen, PenTool, MessageSquare, Heart, User, ChevronLeft, Send } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('feed');
  const [activePost, setActivePost] = useState(null);
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Elias',
      title: 'La fragua del desierto',
      content: 'El polvo se adhiere a la piel como un recordatorio constante de lo que fuimos. Caminar por estos senderos olvidados no es un acto de penitencia, sino de alquimia. Cada paso bajo el sol abrasador evapora una gota de debilidad, dejando atrás únicamente la esencia cruda de la supervivencia. Los cuervos nos observan desde las cornisas de las tabernas ruinosas, esperando el momento en que el plomo de nuestra voluntad ceda antes de convertirse en acero.',
      likes: 24,
      date: 'Hace 2 horas',
      marginNotes: [
        { id: 1, author: 'LectorNocturno', text: 'La metáfora de la alquimia es brillante aquí.' },
        { id: 2, author: 'Ana_S', text: 'Siento la atmósfera asfixiante del desierto. Excelente.' }
      ]
    },
    {
      id: 2,
      author: 'Valeria M.',
      title: 'El café de las tres',
      content: 'Siempre pido la misma taza en la misma esquina. No por el sabor, sino por el ángulo desde el cual puedo observar la puerta. Cada vez que la campanilla suena, una pequeña fracción de mi mente espera que seas tú cruzando el umbral, con esa bufanda gris y la mirada perdida. El café se enfría, la puerta se cierra y el ciclo comienza de nuevo mañana.',
      likes: 15,
      date: 'Hace 5 horas',
      marginNotes: [
        { id: 1, author: 'LetrasVivas', text: 'Qué melancolía tan palpable.' }
      ]
    }
  ]);

  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newNote, setNewNote] = useState('');

  const handlePublish = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        id: Date.now(),
        author: 'Tú (Usuario)',
        title: newPost.title,
        content: newPost.content,
        likes: 0,
        date: 'Justo ahora',
        marginNotes: []
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '' });
      setCurrentView('feed');
    }
  };

  const handleAddNote = () => {
    if (newNote.trim() && activePost) {
      const updatedPosts = posts.map(p => {
        if (p.id === activePost.id) {
          const updatedPost = {
            ...p,
            marginNotes: [...p.marginNotes, { id: Date.now(), author: 'Tú', text: newNote }]
          };
          setActivePost(updatedPost);
          return updatedPost;
        }
        return p;
      });
      setPosts(updatedPosts);
      setNewNote('');
    }
  };

  const handleLike = (e, postId) => {
    e.stopPropagation();
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 font-sans selection:bg-stone-200">
      <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentView('feed')}
          >
            <BookOpen className="w-6 h-6 text-stone-700" />
            <span className="text-xl font-serif font-bold text-stone-800 tracking-tight">Notas al margen</span>
          </div>
          
          <div className="flex gap-6">
            <button 
              onClick={() => setCurrentView('feed')}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${currentView === 'feed' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
            >
              <BookOpen className="w-4 h-4" /> Lectura
            </button>
            <button 
              onClick={() => setCurrentView('write')}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${currentView === 'write' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
            >
              <PenTool className="w-4 h-4" /> Escribir
            </button>
            <button className="flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors">
              <User className="w-4 h-4" /> Perfil
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4 py-8">
        {currentView === 'feed' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-serif text-stone-900 mb-3">Descubre nuevas voces</h1>
              <p className="text-stone-500">Lee, reflexiona y deja tus notas al margen.</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map(post => (
                <div 
                  key={post.id} 
                  onClick={() => {
                    setActivePost(post);
                    setCurrentView('read');
                  }}
                  className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-medium text-stone-500">{post.author}</span>
                    <span className="text-xs text-stone-400">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-serif font-bold mb-3 group-hover:text-stone-600 transition-colors">{post.title}</h2>
                  <p className="text-stone-600 line-clamp-3 leading-relaxed flex-grow">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-stone-100 text-stone-500">
                    <button 
                      onClick={(e) => handleLike(e, post.id)}
                      className="flex items-center gap-1.5 text-sm hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-4 h-4" /> {post.likes}
                    </button>
                    <div className="flex items-center gap-1.5 text-sm">
                      <MessageSquare className="w-4 h-4" /> {post.marginNotes.length} notas
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'write' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-stone-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-serif mb-6 text-stone-800">Tu nuevo texto</h2>
            <input
              type="text"
              placeholder="Título de la obra"
              className="w-full text-3xl font-serif font-bold border-none outline-none placeholder:text-stone-300 mb-6 bg-transparent"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <textarea
              placeholder="Empieza a escribir tu historia aquí..."
              className="w-full h-96 resize-none border-none outline-none text-lg leading-relaxed text-stone-700 placeholder:text-stone-300 bg-transparent font-serif"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
            <div className="flex justify-end mt-6 pt-4 border-t border-stone-100">
              <button 
                onClick={handlePublish}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
                className="bg-stone-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Publicar texto
              </button>
            </div>
          </div>
        )}

        {currentView === 'read' && activePost && (
          <div className="animate-in fade-in duration-500">
            <button 
              onClick={() => setCurrentView('feed')}
              className="flex items-center gap-1 text-stone-500 hover:text-stone-800 transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" /> Volver al muro
            </button>
            
            <div className="flex flex-col lg:flex-row gap-12">
              <article className="lg:w-2/3 bg-white p-8 md:p-12 rounded-xl border border-stone-200 shadow-sm">
                <div className="mb-8">
                  <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">{activePost.title}</h1>
                  <div className="flex items-center gap-4 text-stone-500 text-sm">
                    <span className="font-medium text-stone-700">{activePost.author}</span>
                    <span>•</span>
                    <span>{activePost.date}</span>
                  </div>
                </div>
                <div className="prose prose-stone max-w-none">
                  <p className="text-xl leading-loose font-serif text-stone-800 whitespace-pre-wrap">
                    {activePost.content}
                  </p>
                </div>
              </article>

              <aside className="lg:w-1/3 flex flex-col gap-6">
                <div className="bg-stone-100 rounded-xl p-6 border border-stone-200">
                  <h3 className="font-serif text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" /> Notas al margen
                  </h3>
                  
                  <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                    {activePost.marginNotes.length === 0 ? (
                      <p className="text-stone-500 text-sm italic">No hay notas todavía. Sé el primero en dejar una impresión.</p>
                    ) : (
                      activePost.marginNotes.map(note => (
                        <div key={note.id} className="bg-white p-4 rounded-lg shadow-sm border border-stone-200 relative before:content-[''] before:absolute before:left-0 before:top-4 before:w-1 before:h-8 before:bg-stone-300 before:-ml-[1px]">
                          <span className="text-xs font-bold text-stone-500 block mb-1">{note.author}</span>
                          <p className="text-sm text-stone-700">{note.text}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="relative">
                    <textarea
                      placeholder="Escribe una nota al margen..."
                      className="w-full bg-white border border-stone-300 rounded-lg p-3 pr-12 text-sm resize-none focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
                      rows="3"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                    <button 
                      onClick={handleAddNote}
                      disabled={!newNote.trim()}
                      className="absolute bottom-3 right-3 text-stone-400 hover:text-stone-800 disabled:opacity-50 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}