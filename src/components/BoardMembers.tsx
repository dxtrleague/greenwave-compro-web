"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface BoardMemberType {
  id: string;
  name: string;
  role: string;
  descriptions: string[];
}

interface BoardMembersProps {
  data: BoardMemberType[];
}

export default function BoardMembers({ data }: BoardMembersProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col border-t border-[#D9EEF3]">
      {data && data.map((member) => {
        const isOpen = openId === member.id;
        return (
          <div key={member.id} className="border-b border-[#D9EEF3]">
            <button
              onClick={() => toggleAccordion(member.id)}
              className="w-full py-6 flex items-center justify-between text-left hover:bg-[#F8FDFB]/50 px-4 transition-colors duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="font-heading text-lg md:text-xl font-bold text-[#016b62] group-hover:text-[#357427] transition-colors">
                  {member.name}
                </span>
                <span className="text-sm font-medium text-[#61B58E] bg-[#EAF7F2] px-3 py-1 rounded-full w-fit">
                  {member.role}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-[#016b62] shrink-0 ml-4"
              >
                <ChevronDown size={24} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-6 flex flex-col gap-4 text-neutral-600 leading-relaxed text-[15px]">
                    {member.descriptions.map((desc, idx) => (
                      <p key={idx}>{desc}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
