import React, { useState } from 'react';
import { Check, Copy, Sparkles, HelpCircle, BookOpen, Lightbulb, Compass, Award } from 'lucide-react';

interface MarkdownMessageRendererProps {
  content: string;
  isUser?: boolean;
}

export const MarkdownMessageRenderer: React.FC<MarkdownMessageRendererProps> = ({ content, isUser = false }) => {
  if (isUser) {
    return <div className="font-medium whitespace-pre-wrap">{content}</div>;
  }

  // Pre-process and render sections
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockLines: string[] = [];
  let keyIndex = 0;

  const flushCodeBlock = () => {
    if (codeBlockLines.length > 0) {
      const codeText = codeBlockLines.join('\n');
      elements.push(
        <CodeBlockDisplay key={`code-${keyIndex++}`} code={codeText} language={codeBlockLang} />
      );
      codeBlockLines = [];
    }
    inCodeBlock = false;
    codeBlockLang = '';
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Check for code blocks ```
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock();
      } else {
        inCodeBlock = true;
        codeBlockLang = trimmed.replace('```', '').trim() || 'text';
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(rawLine);
      continue;
    }

    // Empty line creates visual spacer
    if (trimmed === '') {
      elements.push(<div key={`space-${keyIndex++}`} className="h-2" />);
      continue;
    }

    // Headings: ###, ##, #
    if (trimmed.startsWith('### ')) {
      const title = trimmed.replace('### ', '');
      elements.push(
        <div key={`h3-${keyIndex++}`} className="pt-2 pb-1">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <span className="w-1.5 h-4 bg-brand-500 rounded-full inline-block shrink-0"></span>
            <span>{renderInlineText(title)}</span>
          </h4>
        </div>
      );
      continue;
    }

    if (trimmed.startsWith('## ')) {
      const title = trimmed.replace('## ', '');
      elements.push(
        <div key={`h2-${keyIndex++}`} className="pt-3 pb-1.5 border-b border-slate-100">
          <h3 className="text-base font-extrabold text-brand-950 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
            <span>{renderInlineText(title)}</span>
          </h3>
        </div>
      );
      continue;
    }

    if (trimmed.startsWith('# ')) {
      const title = trimmed.replace('# ', '');
      elements.push(
        <div key={`h1-${keyIndex++}`} className="pt-3 pb-2 border-b-2 border-brand-100">
          <h2 className="text-lg font-black text-brand-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-600 shrink-0" />
            <span>{renderInlineText(title)}</span>
          </h2>
        </div>
      );
      continue;
    }

    // Special interactive challenge / exercise card
    if (
      trimmed.includes('Desafio Interativo') ||
      trimmed.includes('Desafio Rápido') ||
      trimmed.includes('Pergunta de Fixação') ||
      trimmed.includes('Exercício para Praticar') ||
      trimmed.startsWith('❓ ') ||
      trimmed.startsWith('💡 Desafio')
    ) {
      elements.push(
        <div
          key={`challenge-${keyIndex++}`}
          className="my-3 p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-950 shadow-xs space-y-1.5"
        >
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{trimmed.replace(/^[#* \t]+/, '')}</span>
          </div>
        </div>
      );
      continue;
    }

    // Key definition or formula box
    if (trimmed.startsWith('🎯 **Definição') || trimmed.startsWith('🎯 Definição')) {
      elements.push(
        <div
          key={`def-${keyIndex++}`}
          className="my-2 p-3.5 rounded-2xl bg-brand-50/80 border border-brand-200 text-brand-950 shadow-xs"
        >
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded-lg bg-brand-500 text-white shrink-0 mt-0.5">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs sm:text-sm leading-relaxed">{renderInlineText(trimmed)}</div>
          </div>
        </div>
      );
      continue;
    }

    // Step-by-step example box
    if (trimmed.startsWith('📐 **Exemplo Resolvido') || trimmed.startsWith('📐 Exemplo')) {
      elements.push(
        <div
          key={`example-box-${keyIndex++}`}
          className="my-2.5 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 shadow-xs"
        >
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded-lg bg-emerald-600 text-white shrink-0 mt-0.5">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs sm:text-sm leading-relaxed">{renderInlineText(trimmed)}</div>
          </div>
        </div>
      );
      continue;
    }

    // Summary box
    if (trimmed.startsWith('📌 **Resumo') || trimmed.startsWith('📌 Resumo')) {
      elements.push(
        <div
          key={`summary-${keyIndex++}`}
          className="my-2.5 p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 text-slate-800 shadow-xs"
        >
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded-lg bg-sky-600 text-white shrink-0 mt-0.5">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs sm:text-sm leading-relaxed">{renderInlineText(trimmed)}</div>
          </div>
        </div>
      );
      continue;
    }

    // Bullet points: - or *
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const itemText = trimmed.substring(2);
      elements.push(
        <div key={`bullet-${keyIndex++}`} className="flex items-start gap-2.5 ml-1 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2 shrink-0" />
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {renderInlineText(itemText)}
          </div>
        </div>
      );
      continue;
    }

    // Numbered items: 1. 2. etc
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      const num = numberedMatch[1];
      const itemText = numberedMatch[2];
      elements.push(
        <div key={`num-${keyIndex++}`} className="flex items-start gap-2.5 ml-1 py-1">
          <span className="w-5 h-5 rounded-md bg-brand-100 text-brand-800 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            {num}
          </span>
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">
            {renderInlineText(itemText)}
          </div>
        </div>
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote
          key={`quote-${keyIndex++}`}
          className="border-l-3 border-brand-400 pl-3 my-2 text-xs sm:text-sm italic text-slate-600 bg-brand-50/30 py-1.5 rounded-r-lg"
        >
          {renderInlineText(trimmed.substring(2))}
        </blockquote>
      );
      continue;
    }

    // Standard paragraph
    elements.push(
      <p key={`p-${keyIndex++}`} className="text-xs sm:text-sm text-slate-800 leading-relaxed py-0.5">
        {renderInlineText(rawLine)}
      </p>
    );
  }

  // Flush any lingering code block
  if (inCodeBlock) {
    flushCodeBlock();
  }

  return <div className="space-y-1">{elements}</div>;
};

// Component for displaying formatted code blocks with copy button
const CodeBlockDisplay: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 overflow-hidden shadow-sm font-mono text-xs">
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-[11px] text-slate-400">
        <span className="font-semibold uppercase tracking-wider">{language || 'código'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-white transition px-2 py-0.5 rounded hover:bg-slate-800 cursor-pointer"
          title="Copiar código"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[10px]">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[10px]">Copiar</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3.5 overflow-x-auto leading-relaxed">
        <pre className="text-emerald-300 font-mono text-[11.5px] whitespace-pre">{code}</pre>
      </div>
    </div>
  );
};

// Helper function to render bold, italic, and inline code without raw markdown symbols
function renderInlineText(text: string): React.ReactNode {
  // Regex to split by inline tokens: `code`, **bold**, *italic*
  // Matching tokens while keeping delimiters
  const tokenRegex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Inline code: `example`
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-slate-200/80 text-brand-900 font-mono text-[11px] font-semibold border border-slate-300/60"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold: **example**
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={index} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *example*
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={index} className="italic text-slate-700">
          {part.slice(1, -1)}
        </em>
      );
    }

    return part;
  });
}
