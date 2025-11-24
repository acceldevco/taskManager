"use client";
import React, { useState } from "react";
import {
  Users,
  Calendar,
  Tag,
  MessageSquare,
  ChevronDown,
  Plus,
  MoreVertical,
  Clock,
  AlertCircle,
} from "lucide-react";

const KanbanBoard = () => {
    const [form, setForm] = useState<any>({
    name: "",
    description: "",
    visibility: "private",
    cover_image: "",
    members: [],
  });
  const [newMember, setNewMember] = useState("");

  const addMember = () => {
    if (newMember.trim() === "") return;
    const newId = "u" + (form.members.length + 1);
    setForm({
      ...form,
      members: [...form.members, { id: newId, name: newMember, role: "member" }],
    });
    setNewMember("");
  };

  const removeMember = (id: string) => {
    setForm({
      ...form,
      members: form.members.filter((m) => m.id !== id),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("گروه جدید:", form);
    setdialog(0)
    // setIsOpen(false);
  };
  const group = {
    id: "g1",
    name: "توسعه بک‌اند",
    description: "گروه مسئول توسعه و نگهداری سرور و API ها",
    created_at: "2025-09-15T10:00:00Z",
    created_by: { id: "u1", name: "علی رضایی" },
    member_count: 5,
    visibility: "private",
    cover_image: "https://example.com/images/backend-cover.png",
    members: [
      {
        id: "u1",
        name: "علی رضایی",
        role: "admin",
        avatar: "https://example.com/avatar/u1.png",
      },
      {
        id: "u2",
        name: "مریم احمدی",
        role: "member",
        avatar: "https://example.com/avatar/u2.png",
      },
    ],
    columns: [
      {
        id: "c1",
        name: "To Do",
        order: 1,
        tasks: [
          {
            id: "t1",
            title: "طراحی دیتابیس",
            description: "ایجاد جداول اصلی و ارتباطات",
            assigned_to: { id: "u1", name: "علی رضایی" },
            due_date: "2025-10-10",
            priority: "high",
            labels: ["backend", "urgent"],
            comments: [
              {
                id: "cm1",
                author: { id: "u2", name: "مریم احمدی" },
                text: "لطفاً جدول کاربران رو هم اضافه کن",
                created_at: "2025-10-01T12:30:00Z",
              },
            ],
            activity: [
              {
                id: "a1",
                action: "created",
                by: "u1",
                timestamp: "2025-09-30T08:00:00Z",
              },
            ],
          },
        ],
      },
      {
        id: "c2",
        name: "In Progress",
        order: 2,
        tasks: [
          {
            id: "t2",
            title: "نوشتن API لاگین",
            description: "ایجاد endpoint برای ورود کاربران",
            assigned_to: { id: "u2", name: "مریم احمدی" },
            due_date: "2025-10-12",
            priority: "medium",
            labels: ["auth", "backend"],
            comments: [],
            activity: [
              {
                id: "a2",
                action: "moved",
                from: "To Do",
                to: "In Progress",
                by: "u2",
                timestamp: "2025-10-01T15:00:00Z",
              },
            ],
          },
        ],
      },
      { id: "c3", name: "Done", order: 3, tasks: [] },
    ],
  };
  const initialData = {
    groups: [
      {
        id: "g1",
        name: "توسعه بک‌اند",
        description: "گروه مسئول توسعه و نگهداری سرور و API ها",
        created_at: "2025-09-15T10:00:00Z",
        created_by: { id: "u1", name: "علی رضایی" },
        member_count: 5,
        visibility: "private",
        cover_image: "https://example.com/images/backend-cover.png",
        members: [
          {
            id: "u1",
            name: "علی رضایی",
            role: "admin",
            avatar: "https://example.com/avatar/u1.png",
          },
          {
            id: "u2",
            name: "مریم احمدی",
            role: "member",
            avatar: "https://example.com/avatar/u2.png",
          },
        ],
        columns: [
          {
            id: "c1",
            name: "To Do",
            order: 1,
            tasks: [
              {
                id: "t1",
                title: "طراحی دیتابیس",
                description: "ایجاد جداول اصلی و ارتباطات",
                assigned_to: { id: "u1", name: "علی رضایی" },
                due_date: "2025-10-10",
                priority: "high",
                labels: ["backend", "urgent"],
                comments: [
                  {
                    id: "cm1",
                    author: { id: "u2", name: "مریم احمدی" },
                    text: "لطفاً جدول کاربران رو هم اضافه کن",
                    created_at: "2025-10-01T12:30:00Z",
                  },
                ],
                activity: [
                  {
                    id: "a1",
                    action: "created",
                    by: "u1",
                    timestamp: "2025-09-30T08:00:00Z",
                  },
                ],
              },
            ],
          },
          {
            id: "c2",
            name: "In Progress",
            order: 2,
            tasks: [
              {
                id: "t2",
                title: "نوشتن API لاگین",
                description: "ایجاد endpoint برای ورود کاربران",
                assigned_to: { id: "u2", name: "مریم احمدی" },
                due_date: "2025-10-12",
                priority: "medium",
                labels: ["auth", "backend"],
                comments: [],
                activity: [
                  {
                    id: "a2",
                    action: "moved",
                    from: "To Do",
                    to: "In Progress",
                    by: "u2",
                    timestamp: "2025-10-01T15:00:00Z",
                  },
                ],
              },
            ],
          },
          {
            id: "c3",
            name: "Done",
            order: 3,
            tasks: [],
          },
        ],
      },
      {
        id: "g2",
        name: "طراحی UI/UX",
        description: "تیم طراحی تجربه کاربری و رابط کاربری محصول",
        created_at: "2025-09-20T12:30:00Z",
        created_by: { id: "u3", name: "سارا محمدی" },
        member_count: 3,
        visibility: "public",
        cover_image: "https://example.com/images/uiux-cover.png",
        members: [
          {
            id: "u3",
            name: "سارا محمدی",
            role: "admin",
            avatar: "https://example.com/avatar/u3.png",
          },
        ],
        columns: [
          { id: "c4", name: "Wireframes", order: 1, tasks: [] },
          { id: "c5", name: "Design", order: 2, tasks: [] },
          { id: "c6", name: "Review", order: 3, tasks: [] },
        ],
      },
    ],
  };
  const [dialog, setdialog] = useState<any>(0);
  const [data, setData] = useState(initialData);
  const [selectedGroup, setSelectedGroup] = useState(data.groups[0]);
  const [selectedTask, setSelectedTask] = useState(null);

  const priorityColors = {
    high: "bg-red-100 text-red-700 border-red-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    low: "bg-green-100 text-green-700 border-green-300",
  };

  const priorityText = {
    high: "فوری",
    medium: "متوسط",
    low: "کم",
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                سیستم مدیریت پروژه
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                مدیریت وظایف و همکاری تیمی
              </p>
            </div>
            <button
              onClick={() => {
                setdialog(1);
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              <span>وظیفه جدید</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
       
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Users className="text-purple-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">گروه‌های کاری</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.groups.map((group) => (
              <div
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedGroup.id === group.id
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300 bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {group.description}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      group.visibility === "private"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {group.visibility === "private" ? "خصوصی" : "عمومی"}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                  <span className="flex items-center gap-1">
                    <Users size={16} />
                    {group.member_count} عضو
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={16} />
                    {group.columns.reduce(
                      (acc, col) => acc + col.tasks.length,
                      0
                    )}{" "}
                    وظیفه
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

     
        {/* <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {selectedGroup.name}
                </h3>
                <p className="text-sm text-gray-500">
                  ایجاد شده توسط {selectedGroup.created_by.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedGroup.members.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  title={member.name}
                >
                  {member.name.charAt(0)}
                </div>
              ))}
              {selectedGroup.member_count > 3 && (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold">
                  +{selectedGroup.member_count - 3}
                </div>
              )}
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedGroup.columns.map((column) => (
              <div key={column.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    {column.name}
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                      {column.tasks.length}
                    </span>
                  </h4>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus size={18} />
                  </button>
                </div>

                <div className="space-y-3">
                  {column.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-bold text-gray-900 text-sm">
                          {task.title}
                        </h5>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical size={16} />
                        </button>
                      </div>

                      <p className="text-xs text-gray-600 mb-3">
                        {task.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {task.labels.map((label, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                          >
                            {label}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                            {task.assigned_to.name.charAt(0)}
                          </div>
                          <span className="text-gray-600">
                            {task.assigned_to.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {task.comments.length > 0 && (
                            <span className="flex items-center gap-1 text-gray-500">
                              <MessageSquare size={14} />
                              {task.comments.length}
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 rounded border ${
                              priorityColors[task.priority]
                            }`}
                          >
                            {priorityText[task.priority]}
                          </span>
                        </div>
                      </div>

                      {task.due_date && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                          <Calendar size={14} />
                          <span>
                            {new Date(task.due_date).toLocaleDateString(
                              "fa-IR"
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedTask.title}
                  </h3>
                  <p className="text-gray-600">{selectedTask.description}</p>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-600">مسئول:</span>
                    <span className="font-medium">
                      {selectedTask.assigned_to.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-600">مهلت:</span>
                    <span className="font-medium">
                      {new Date(selectedTask.due_date).toLocaleDateString(
                        "fa-IR"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-600">اولویت:</span>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        priorityColors[selectedTask.priority]
                      }`}
                    >
                      {priorityText[selectedTask.priority]}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Tag size={18} />
                    برچسب‌ها
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.labels.map((label, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedTask.comments.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <MessageSquare size={18} />
                      نظرات ({selectedTask.comments.length})
                    </h4>
                    <div className="space-y-3">
                      {selectedTask.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-gray-50 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {comment.author.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                {comment.author.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(
                                  comment.created_at
                                ).toLocaleDateString("fa-IR")}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">
                            {comment.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {dialog && (
        <>
          {/* دکمه باز کردن دیالوگ */}
          {/* <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: "0.5rem 1rem",
          background: "#4f46e5",
          color: "white",
          borderRadius: "0.5rem",
          border: "none",
          cursor: "pointer"
        }}
      >
        👥 مشاهده گروه
      </button> */}

 <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        fontFamily: 'Vazirmatn, Tahoma, sans-serif',
        direction: 'rtl',
        padding: '1rem',
        overflowY: 'auto'
      }}
      onClick={() => setdialog(false)}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2px',
          borderRadius: window.innerWidth < 640 ? '1rem' : '1.5rem',
          width: '100%',
          maxWidth: '600px',
          margin: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          animation: 'slideUp 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            background: 'white',
            padding: window.innerWidth < 640 ? '1.25rem' : '2rem',
            borderRadius: window.innerWidth < 640 ? '0.95rem' : '1.4rem'
          }}
        >
          <div style={{ 
            textAlign: 'center', 
            marginBottom: window.innerWidth < 640 ? '1.25rem' : '2rem',
            paddingBottom: window.innerWidth < 640 ? '0.75rem' : '1rem',
            borderBottom: '2px solid #f0f0f0'
          }}>
            <div style={{
              fontSize: window.innerWidth < 640 ? '2rem' : '3rem',
              marginBottom: '0.5rem'
            }}>🎉</div>
            <h2
              style={{
                fontSize: window.innerWidth < 640 ? '1.25rem' : '1.75rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}
            >
              افزودن گروه جدید
            </h2>
          </div>

          <div>
            {/* نام گروه */}
            <div style={{ marginBottom: window.innerWidth < 640 ? '1rem' : '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: window.innerWidth < 640 ? '0.875rem' : '0.95rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                📝 نام گروه
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="مثال: گروه توسعه‌دهندگان"
                style={{
                  width: '100%',
                  padding: window.innerWidth < 640 ? '0.625rem 0.875rem' : '0.75rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: window.innerWidth < 640 ? '0.9rem' : '1rem',
                  transition: 'all 0.2s',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* توضیحات */}
            <div style={{ marginBottom: window.innerWidth < 640 ? '1rem' : '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: window.innerWidth < 640 ? '0.875rem' : '0.95rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                ✍️ توضیحات
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="توضیحاتی درباره گروه بنویسید..."
                style={{
                  width: '100%',
                  padding: window.innerWidth < 640 ? '0.625rem 0.875rem' : '0.75rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: window.innerWidth < 640 ? '0.9rem' : '1rem',
                  height: window.innerWidth < 640 ? '80px' : '100px',
                  transition: 'all 0.2s',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* اعضا */}
            <div style={{ marginBottom: window.innerWidth < 640 ? '1rem' : '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: window.innerWidth < 640 ? '0.875rem' : '0.95rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                👥 اعضای گروه
              </label>
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem',
                flexDirection: window.innerWidth < 400 ? 'column' : 'row'
              }}>
                <input
                  type="text"
                  placeholder="نام عضو جدید"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMember())}
                  style={{
                    flex: 1,
                    padding: window.innerWidth < 640 ? '0.625rem 0.875rem' : '0.75rem 1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: window.innerWidth < 640 ? '0.9rem' : '1rem',
                    outline: 'none',
                    width: window.innerWidth < 400 ? '100%' : 'auto',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={addMember}
                  style={{
                    padding: window.innerWidth < 640 ? '0.625rem 1.25rem' : '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    fontSize: window.innerWidth < 640 ? '1rem' : '1.25rem',
                    fontWeight: '600',
                    transition: 'transform 0.2s',
                    boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)',
                    width: window.innerWidth < 400 ? '100%' : 'auto'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  ➕ افزودن
                </button>
              </div>
              
              {form.members.length > 0 && (
                <div style={{ 
                  marginTop: '1rem',
                  maxHeight: window.innerWidth < 640 ? '150px' : '200px',
                  overflowY: 'auto',
                  padding: '0.5rem'
                }}>
                  {form.members.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                        padding: window.innerWidth < 640 ? '0.625rem 0.875rem' : '0.75rem 1rem',
                        marginBottom: '0.5rem',
                        borderRadius: '0.75rem',
                        transition: 'all 0.2s',
                        border: '2px solid transparent',
                        gap: '0.5rem'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#667eea';
                        e.currentTarget.style.transform = 'translateX(-2px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span style={{ 
                        fontWeight: '500',
                        color: '#1f2937',
                        fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                        wordBreak: 'break-word',
                        flex: 1
                      }}>
                        {m.name} <span style={{ 
                          color: '#6b7280',
                          fontSize: window.innerWidth < 640 ? '0.8rem' : '0.9rem'
                        }}>({m.role})</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => removeMember(m.id)}
                        style={{
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          padding: window.innerWidth < 640 ? '0.375rem 0.625rem' : '0.25rem 0.5rem',
                          cursor: 'pointer',
                          fontSize: window.innerWidth < 640 ? '0.8rem' : '0.9rem',
                          transition: 'all 0.2s',
                          flexShrink: 0
                        }}
                        onMouseOver={(e) => e.target.style.background = '#dc2626'}
                        onMouseOut={(e) => e.target.style.background = '#ef4444'}
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* وضعیت */}
            <div style={{ marginBottom: window.innerWidth < 640 ? '1rem' : '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: window.innerWidth < 640 ? '0.875rem' : '0.95rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                🔐 وضعیت گروه
              </label>
              <select
                name="visibility"
                value={form.visibility}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: window.innerWidth < 640 ? '0.625rem 0.875rem' : '0.75rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: window.innerWidth < 640 ? '0.9rem' : '1rem',
                  outline: 'none',
                  cursor: 'pointer',
                  background: 'white',
                  boxSizing: 'border-box'
                }}
              >
                <option value="private">🔒 خصوصی</option>
                <option value="public">🌍 عمومی</option>
              </select>
            </div>

            {/* کاور */}
            <div style={{ marginBottom: window.innerWidth < 640 ? '1.25rem' : '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: window.innerWidth < 640 ? '0.875rem' : '0.95rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                🖼️ تصویر کاور
              </label>
              <input
                type="url"
                name="cover_image"
                value={form.cover_image}
                onChange={handleChange}
                placeholder="https://example.com/cover.png"
                style={{
                  width: '100%',
                  padding: window.innerWidth < 640 ? '0.625rem 0.875rem' : '0.75rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: window.innerWidth < 640 ? '0.9rem' : '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* دکمه‌ها */}
            <div
              style={{
                display: 'flex',
                gap: window.innerWidth < 640 ? '0.5rem' : '1rem',
                paddingTop: window.innerWidth < 640 ? '0.75rem' : '1rem',
                borderTop: '2px solid #f0f0f0',
                flexDirection: window.innerWidth < 400 ? 'column' : 'row'
              }}
            >
              <button
                type="button"
                onClick={() => setdialog(false)}
                style={{
                  flex: 1,
                  padding: window.innerWidth < 640 ? '0.75rem 1rem' : '0.875rem 1.5rem',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  fontSize: window.innerWidth < 640 ? '0.9rem' : '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 6px rgba(239, 68, 68, 0.3)',
                  width: window.innerWidth < 400 ? '100%' : 'auto'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 12px rgba(239, 68, 68, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 6px rgba(239, 68, 68, 0.3)';
                }}
              >
                ❌ انصراف
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                style={{
                  flex: 1,
                  padding: window.innerWidth < 640 ? '0.75rem 1rem' : '0.875rem 1.5rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  fontSize: window.innerWidth < 640 ? '0.9rem' : '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 6px rgba(102, 126, 234, 0.4)',
                  width: window.innerWidth < 400 ? '100%' : 'auto'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 12px rgba(102, 126, 234, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 6px rgba(102, 126, 234, 0.4)';
                }}
              >
                💾 ذخیره گروه
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 640px) {
          input, textarea, select {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
        </>
      )}
    </div>
  );
};

export default KanbanBoard;
