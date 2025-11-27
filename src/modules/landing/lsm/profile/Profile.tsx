import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Save } from "lucide-react";
import { User, EditProfileForm } from "../types";

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [form, setForm] = useState<EditProfileForm>({
    name: user.name,
    email: user.email,
    bio: user.bio,
  });

  useEffect(() => {
    setForm({ name: user.name, email: user.email, bio: user.bio });
  }, [user]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate({ ...user, ...form });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 lg:p-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-32 bg-[#043c42] relative">
          <div className="absolute -bottom-10 left-8 p-1 bg-white rounded-full">
            <div className="h-20 w-20 rounded-full bg-[#1a7984] flex items-center justify-center text-white text-2xl font-bold border-4 border-white">
              {user.avatar}
            </div>
          </div>
        </div>
        <div className="pt-14 px-8 pb-8">
          <h2 className="text-2xl font-bold text-[#043c42]">Mi Perfil</h2>
          <p className="text-gray-500 text-sm mb-6">
            Gestiona tu información personal
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] focus:border-transparent outline-none bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biografía
                </label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setForm({ ...form, bio: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] focus:border-transparent outline-none"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end pt-6 border-t border-gray-100">
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#006a78] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#043c42] transition-colors shadow-sm"
              >
                <Save size={18} /> Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
