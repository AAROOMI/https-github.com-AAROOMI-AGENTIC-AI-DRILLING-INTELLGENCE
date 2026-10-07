import React, { useState } from 'react';
import { BookOpen, Search, Upload, FileText, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { LanguageCode, RagDocument } from '../../types';
import { LocalRagService, RagSearchResult } from '../../services/rag/localRagService';

interface KnowledgeBaseViewProps {
  currentLanguage: LanguageCode;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [documents, setDocuments] = useState<RagDocument[]>(LocalRagService.getDocuments());
  const [searchQuery, setSearchQuery] = useState('casing design safety factors burst and collapse sour service');
  const [searchResult, setSearchResult] = useState<RagSearchResult | null>(() =>
    LocalRagService.search('casing design safety factors burst and collapse sour service')
  );
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const res = LocalRagService.search(searchQuery);
    setSearchResult(res);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newDoc = LocalRagService.uploadDocument(file, 'Standard');
    setDocuments(LocalRagService.getDocuments());
    setUploadNotice(`Document '${file.name}' successfully parsed and indexed into local vector base.`);
    setTimeout(() => setUploadNotice(null), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'قاعدة المعرفة والوثائق الهندسية (Local Enterprise RAG)' : 'Local Enterprise RAG Knowledge Base & Document Registry'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'فهرسة وتدقيق المعايير الهندسية (DEM)، تقارير نهاية الآبار (EOWR)، والدراسات الجيوميكانيكية دون الحاجة للإنترنت.'
              : 'Air-gapped semantic vector retrieval with exact chapter/section source evidence citations.'}
          </div>
        </div>

        <label className="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs cursor-pointer flex items-center gap-1.5 transition-colors">
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Document</span>
          <input
            type="file"
            accept=".pdf,.docx,.xlsx,.csv,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {uploadNotice && (
        <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{uploadNotice}</span>
        </div>
      )}

      {/* Semantic Search Bar */}
      <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search standards, manuals, pore pressure regimes..."
              className="w-full bg-slate-900 border border-slate-800 rounded pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-600"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-4 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs transition-colors"
          >
            Search RAG
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column: Retrieved Chunks & AI Inference */}
        <div className="lg:col-span-7 space-y-3">
          {searchResult && (
            <>
              {/* AI Inference Summary */}
              <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-200 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Synthesized Engineering Inference:</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded border border-slate-800/60">
                  {searchResult.aiInference}
                </p>
                <div className="text-[10px] text-slate-500 font-mono">
                  Applied Rule: {searchResult.engineeringFormulaApplied}
                </div>
              </div>

              {/* Matched Chunks */}
              <div className="space-y-2">
                <div className="text-xs text-slate-400">Cited Knowledge Evidence Chunks:</div>
                {searchResult.chunks.map((chk) => (
                  <div
                    key={chk.id}
                    className="p-3 rounded bg-[#08101e] border border-sky-950/60 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sky-300 font-medium truncate max-w-[80%]">
                        {chk.docTitle}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        {chk.relevanceScore}% Match
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono">{chk.pageOrSection}</div>
                    <div className="p-2 rounded bg-slate-900/50 text-[11px] text-slate-300 leading-relaxed border border-slate-800/50">
                      {chk.content}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Column: Indexed Document Catalog */}
        <div className="lg:col-span-5 p-3.5 rounded bg-[#08101e] border border-sky-950/60 space-y-3">
          <div className="text-xs text-slate-200 pb-2 border-b border-sky-950/40">
            Registered Knowledge Documents ({documents.length})
          </div>

          <div className="space-y-2 text-xs">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-2.5 rounded bg-slate-900/60 border border-slate-800/60 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-200 font-medium truncate max-w-[70%]">
                    {doc.title}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-sky-950/80 text-sky-300 text-[10px] font-mono">
                    {doc.fileType}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-2">
                  {doc.summary}
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-800/50">
                  <span>Category: {doc.category}</span>
                  <span>{doc.chunkCount} Chunks • {doc.sizeKb} KB</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
