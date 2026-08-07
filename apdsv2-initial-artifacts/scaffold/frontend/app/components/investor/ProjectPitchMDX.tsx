'use client';

import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    fontFamily: 'Inter, sans-serif',
    primaryColor: '#5EC8F2',
    primaryTextColor: '#fff',
    primaryBorderColor: '#5EC8F2',
    lineColor: '#334155',
    secondaryColor: '#1e293b',
    tertiaryColor: '#0f172a'
  }
});

interface ProjectPitchMDXProps {
  content: string;
}

export default function ProjectPitchMDX({ content }: ProjectPitchMDXProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Render Mermaid diagrams after Markdown renders
    if (containerRef.current) {
      mermaid.run({
        nodes: containerRef.current.querySelectorAll('.mermaid')
      });
    }
  }, [content]);

  useGSAP(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, { scope: containerRef, dependencies: [content] });

  return (
    <div className="glass-blue-card p-6 md:p-10 rounded-2xl overflow-hidden" ref={containerRef}>
      <div className="prose prose-invert prose-headings:font-syne prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-xl prose-a:text-[#5EC8F2] hover:prose-a:text-white prose-a:transition-colors prose-strong:text-white prose-code:text-[#5EC8F2] prose-code:bg-[#5EC8F2]/10 prose-code:px-1 prose-code:rounded prose-img:rounded-xl max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const isMermaid = match && match[1] === 'mermaid';

            if (!inline && isMermaid) {
              return (
                <div className="my-8 w-full overflow-x-auto rounded-xl bg-black/40 p-4 border border-white/5 flex justify-center">
                  <div className="mermaid">{String(children).replace(/\n$/, '')}</div>
                </div>
              );
            }

            return !inline ? (
              <pre className="bg-black/40 p-4 rounded-xl border border-white/5 overflow-x-auto my-6 text-sm">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
