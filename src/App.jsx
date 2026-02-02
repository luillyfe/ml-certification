
import React, { useState, useEffect } from 'react';
import { Cloud, CheckCircle, ChevronDown, ExternalLink, Lightbulb, BarChart, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { curriculum, heroImage } from './data/curriculum';

export default function App() {
  // State initialization with localStorage persistence
  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem('completedTopics');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [passedQuizzes, setPassedQuizzes] = useState(() => {
    const saved = localStorage.getItem('passedQuizzes');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [expandedWeek, setExpandedWeek] = useState(null);
  const [activeQuizWeekId, setActiveQuizWeekId] = useState(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('completedTopics', JSON.stringify([...completedTopics]));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('passedQuizzes', JSON.stringify([...passedQuizzes]));
  }, [passedQuizzes]);

  // Handlers
  const toggleTopic = (topicId) => {
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId);
    } else {
      newCompleted.add(topicId);
    }
    setCompletedTopics(newCompleted);
  };

  const toggleWeek = (weekId) => {
    setExpandedWeek(expandedWeek === weekId ? null : weekId);
  };

  const handleQuizPass = (weekId) => {
    const newPassed = new Set(passedQuizzes);
    newPassed.add(weekId);
    setPassedQuizzes(newPassed);
    setActiveQuizWeekId(null);
  };

  // Stats Calculation
  const totalTopics = curriculum.reduce((acc, w) => acc + w.topics.length, 0);
  const completedCount = completedTopics.size;
  const passedCount = passedQuizzes.size;

  // Weighted: Topics 70%, Quizzes 30%
  const topicRatio = completedCount / totalTopics;
  const quizRatio = passedCount / 6;
  const totalProgress = Math.round((topicRatio * 0.7 + quizRatio * 0.3) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-roboto">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-google-blue text-3xl select-none">cloud_done</span>
            <h1 className="text-xl font-google font-bold text-slate-800 tracking-tight hidden sm:block">
              Road to Certification: <span className="text-google-blue">ML Engineer</span>
            </h1>
            <h1 className="text-xl font-google font-bold text-slate-800 tracking-tight sm:hidden">GCP ML Engineer</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-100 rounded-full px-4 py-1.5">
              <span className="material-symbols-outlined text-google-green text-xl select-none">verified</span>
              <span className="text-sm font-bold text-slate-700">{totalProgress}% Complete</span>
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 w-full bg-slate-100">
          <div
            className="h-full bg-google-blue transition-all duration-700 ease-out"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Syllabus Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Hero Card */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg group">
            <img
              src={heroImage}
              alt="Cloud AI"
              className="w-full h-48 sm:h-64 object-cover transform group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <span className="inline-block px-3 py-1 bg-google-yellow text-slate-900 text-xs font-bold rounded-full mb-2 w-max">
                PROFESSIONAL CERTIFICATION
              </span>
              <h2 className="text-2xl sm:text-4xl font-google font-bold text-white mb-2">
                Master the Machine Learning Engineer Exam
              </h2>
              <p className="text-slate-200 max-w-2xl text-sm sm:text-base">
                A comprehensive 6-week interactive study plan covering BigQuery ML, Vertex AI, MLOps, and more. Track your progress, test your knowledge, and prepare for the 6 sections of the exam.
              </p>
            </div>
          </div>

          {/* Weeks List */}
          <div className="space-y-4">
            {curriculum.map((week) => (
              <WeekCard
                key={week.id}
                week={week}
                isExpanded={expandedWeek === week.id}
                onToggle={() => toggleWeek(week.id)}
                isQuizPassed={passedQuizzes.has(week.id)}
                completedTopics={completedTopics}
                onToggleTopic={toggleTopic}
                onStartQuiz={() => setActiveQuizWeekId(week.id)}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <StatsCard
            completedCount={completedCount}
            passedCount={passedCount}
            passedQuizzes={passedQuizzes}
          />
          <TipsCard />
          <ResourceLink />
        </div>
      </main>

      {/* Quiz Modal */}
      {activeQuizWeekId && (
        <QuizModal
          week={curriculum.find(w => w.id === activeQuizWeekId)}
          onClose={() => setActiveQuizWeekId(null)}
          onPass={() => handleQuizPass(activeQuizWeekId)}
        />
      )}
    </div>
  );
}

function WeekCard({ week, isExpanded, onToggle, isQuizPassed, completedTopics, onToggleTopic, onStartQuiz }) {
  const weekCompletedCount = week.topics.filter(t => completedTopics.has(t.id)).length;

  return (
    <div className={`bg-white rounded-xl shadow-sm border transition-all overflow-hidden ${isExpanded ? 'border-google-blue ring-1 ring-blue-100' : 'border-slate-200'}`}>
      <div
        onClick={onToggle}
        className="p-5 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition select-none"
      >
        <div className="flex items-center gap-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isQuizPassed ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-google-blue'}`}>
            {isQuizPassed ? <span className="material-symbols-outlined">emoji_events</span> : week.id}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 font-google">Week {week.id}: {week.title}</h3>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">Exam Weight: {week.weight}%</span>
              <span>{weekCompletedCount}/{week.topics.length} Topics</span>
            </div>
          </div>
        </div>
        <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-5 fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Topics */}
            <div>
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">checklist</span> Key Study Topics
              </h4>
              <ul className="space-y-3">
                {week.topics.map(topic => (
                  <li key={topic.id} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:border-blue-200 transition">
                    <input
                      type="checkbox"
                      id={topic.id}
                      checked={completedTopics.has(topic.id)}
                      onChange={() => onToggleTopic(topic.id)}
                      className="mt-1 w-4 h-4 text-google-blue rounded focus:ring-google-blue border-slate-300 cursor-pointer accent-google-blue"
                    />
                    <div className="flex-1">
                      <label htmlFor={topic.id} className={`text-sm text-slate-700 cursor-pointer select-none block ${completedTopics.has(topic.id) ? 'line-through text-slate-400' : ''}`}>
                        {topic.text}
                      </label>
                      <a href={topic.link} target="_blank" rel="noopener noreferrer" className="text-xs text-google-blue hover:underline mt-1 inline-flex items-center gap-1">
                        Docs <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Session & Actions */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <div className="h-24 bg-slate-200 overflow-hidden relative">
                  <img src={week.image} className="w-full h-full object-cover opacity-90" alt="Session Header" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-700">WEDNESDAY SESSION</div>
                </div>
                <div className="p-4">
                  <h5 className="font-bold text-slate-800 text-sm mb-1">{week.session.title}</h5>
                  <p className="text-xs text-slate-500 mb-3">{week.session.focus}</p>
                  <button className="w-full text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded font-medium transition">Add to Calendar</button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100 text-center">
                <h5 className="text-sm font-bold text-slate-800 mb-1">Ready to test yourself?</h5>
                <p className="text-xs text-slate-500 mb-3">3 Questions • Instant Feedback</p>
                {isQuizPassed ? (
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg font-bold text-sm shadow-sm cursor-default flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">check</span> Quiz Passed
                  </button>
                ) : (
                  <button onClick={onStartQuiz} className="w-full bg-google-blue hover:bg-blue-600 text-white py-2 rounded-lg font-bold text-sm shadow-sm transition flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">quiz</span> Take Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatsCard({ completedCount, passedCount, passedQuizzes }) {
  // Styles based on week index
  const getBarColor = (index) => {
    const colors = ['bg-blue-400', 'bg-indigo-400', 'bg-purple-400', 'bg-pink-400', 'bg-red-400', 'bg-orange-400'];
    return colors[index % colors.length];
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-google font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-google-blue">analytics</span> Your Stats
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-3xl font-bold text-google-blue">{completedCount}</p>
          <p className="text-xs text-blue-600 font-medium uppercase mt-1">Topics Mastered</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <p className="text-3xl font-bold text-google-green">{passedCount}/6</p>
          <p className="text-xs text-green-600 font-medium uppercase mt-1">Quizzes Passed</p>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm text-slate-500 mb-2 font-medium">Exam Weight Coverage</p>
        <div className="flex h-4 rounded-full overflow-hidden bg-slate-100">
          {curriculum.map((week, idx) => {
            const passed = passedQuizzes.has(week.id);
            const width = passed ? week.weight : 0; // Or some logic for partial progress, but original code used quiz pass
            // Original logic: bar width is fixed (proportional to weight if we want true representation, but here just equal width slots?)
            // Actually the HTML used style="width: 0%" initially and updated it.
            // But the visual look is a segmented bar.
            // Let's just make it equal segments for simplicity or proportional based on weight relative to total (100).

            return (
              <div
                key={week.id}
                title={`Week ${week.id}`}
                className={`${getBarColor(idx)} h-full transition-all duration-500`}
                style={{
                  width: `${week.weight}%`,
                  opacity: passed ? 1 : 0.3
                }}
              />
            )
          })}
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          {curriculum.map((w, i) => <span key={w.id}>W{w.id}</span>)}
        </div>
      </div>
    </div>
  );
}

function TipsCard() {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-md p-6 text-white">
      <h3 className="text-lg font-google font-bold mb-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-google-yellow">lightbulb</span> Pro Tips
      </h3>
      <ul className="space-y-3 text-sm text-slate-300">
        <li className="flex gap-3">
          <span className="material-symbols-outlined text-xs mt-1 shrink-0">check_circle</span>
          <span>Focus on <strong>Vertex AI</strong> services—it's the core of the new exam.</span>
        </li>
        <li className="flex gap-3">
          <span className="material-symbols-outlined text-xs mt-1 shrink-0">check_circle</span>
          <span>Don't ignore <strong>MLOps</strong>. CI/CD for ML is ~22% of the score.</span>
        </li>
        <li className="flex gap-3">
          <span className="material-symbols-outlined text-xs mt-1 shrink-0">check_circle</span>
          <span>Know when to use <strong>BigQuery ML</strong> (SQL users) vs. Custom Training.</span>
        </li>
      </ul>
    </div>
  );
}

function ResourceLink() {
  return (
    <a href="https://cloud.google.com/learn/certification/machine-learning-engineer" target="_blank" rel="noopener noreferrer" className="block bg-white border border-slate-200 p-4 rounded-xl hover:shadow-md transition flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <img src="https://www.gstatic.com/images/branding/product/1x/google_cloud_48dp.png" alt="GCP" className="w-8 h-8" />
        <div>
          <p className="font-bold text-slate-800 text-sm group-hover:text-google-blue transition">Official Exam Guide</p>
          <p className="text-xs text-slate-500">cloud.google.com</p>
        </div>
      </div>
      <span className="material-symbols-outlined text-slate-400 group-hover:text-google-blue">open_in_new</span>
    </a>
  );
}

function QuizModal({ week, onClose, onPass }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const question = week.quiz[currentIdx];
  const isLast = currentIdx === week.quiz.length - 1;

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === question.correct;
    if (isCorrect) setScore(s => s + 1);

    setFeedback({
      isCorrect,
      explanation: question.explanation
    });
  };

  const handleNext = () => {
    setFeedback(null);
    setSelectedOption(null);
    if (isLast) {
      // Calculate final
      const finalScore = score + (feedback?.isCorrect ? 0 : 0); // Score already updated
      // Wait, react state update might not be immediate if I use score variable here.
      // Actually 'score' inside this render won't be updated yet if I just called setScore.
      // But I am checking handleNext after handleSubmit, so user clicks Next, so score is updated.
      setShowResults(true);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  };

  // Determine pass status on results screen
  const passed = score >= 2;

  useEffect(() => {
    if (showResults && passed) {
      onPass();
    }
  }, [showResults, passed]);

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h3 class="text-xl font-google font-bold text-slate-800">Quiz Results</h3>
              <p class="text-sm text-slate-500">Week {week.id}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
          <div className="p-6 overflow-y-auto text-center py-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} mb-4`}>
              <span className="material-symbols-outlined text-4xl">{passed ? 'emoji_events' : 'sentiment_dissatisfied'}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{passed ? 'Great Job!' : 'Keep Studying'}</h3>
            <p className="text-slate-500 mb-6">You got <strong className={passed ? 'text-green-600' : 'text-red-600'}>{score}/{week.quiz.length}</strong> correct.</p>
            {passed
              ? <p className="text-sm text-slate-600">You've mastered the key concepts for <strong>{week.title}</strong>.</p>
              : <p className="text-sm text-slate-600">Review the documentation links in the topics list and try again!</p>
            }
          </div>
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
            <button onClick={onClose} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl font-bold transition">Close Results</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-google font-bold text-slate-800">Week {week.id} Quiz</h3>
            <p className="text-sm text-slate-500">Test your readiness</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="fade-in">
            <h4 className="text-lg font-medium text-slate-800 mb-6">{question.q}</h4>
            <div className="space-y-3">
              {question.options.map((opt, idx) => (
                <label key={idx} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-slate-50 transition group ${feedback ? (question.correct === idx ? 'border-green-300 bg-green-50' : (selectedOption === idx ? 'border-red-300 bg-red-50' : 'border-slate-200')) : (selectedOption === idx ? 'border-blue-300 bg-blue-50' : 'border-slate-200')}`}>
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="quiz-opt"
                      className="peer h-5 w-5 border-gray-300 text-google-blue focus:ring-google-blue accent-google-blue"
                      checked={selectedOption === idx}
                      onChange={() => !feedback && setSelectedOption(idx)}
                      disabled={!!feedback}
                    />
                  </div>
                  <span className="text-slate-600 group-hover:text-slate-900">{opt}</span>
                </label>
              ))}
            </div>

            {feedback && (
              <div className="mt-6 fade-in">
                <div className={`p-4 rounded-lg ${feedback.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`font-bold ${feedback.isCorrect ? 'text-green-700' : 'text-red-700'} mb-1`}>
                    {feedback.isCorrect ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className="text-sm text-slate-700">{feedback.explanation}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
          <span className="text-sm font-medium text-slate-500">Question {currentIdx + 1} of {week.quiz.length}</span>
          {feedback ? (
            <button onClick={handleNext} className="bg-google-blue hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition flex items-center gap-2">
              {isLast ? "Finish Quiz" : "Next Question"} <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="bg-google-blue hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium shadow-sm transition flex items-center gap-2">
              Submit Answer <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
