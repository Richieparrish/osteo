"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "~/components/ai-elements/conversation";
import {
  Message,
  MessageAttachment,
  MessageAttachments,
  MessageContent,
  MessageResponse,
} from "~/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFileTrigger,
} from "~/components/ai-elements/prompt-input";
import { UploadIcon, Activity, FileUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Shimmer } from "~/components/ai-elements/shimmer";
import { useEffect, useState, Suspense, useRef } from "react";
import { cn } from "~/lib/utils";
import Link from "next/link";

const loadingMessages = [
  "Analyzing skeletal structure...",
  "Detecting bone anomalies...",
  "Identifying joint conditions...",
  "Scanning for fractures...",
  "Evaluating osteoarthritis indicators...",
  "Generating diagnostic report...",
];

function HeroUpload({ onUpload }: { onUpload: (files: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(Array.from(e.target.files));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 text-sm font-medium">
            <Activity className="size-4 text-emerald-500" />
            <span>Bone Anomaly Detection AI</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            <Link href="https://github.com/Richieparrish/osteo" target="_blank" rel="noopener noreferrer">
              Osteo Analysis
            </Link>
          </h1>
          <p className="text-xl text-zinc-500 font-light max-w-xl mx-auto dark:text-zinc-400">
            Upload a skeletal X-ray to instantly identify fractures, osteoarthritis, and other conditions.
          </p>
        </div>

        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "group relative flex flex-col items-center justify-center w-full aspect-[2/1] rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden bg-zinc-50 dark:bg-zinc-900/50",
            isDragging
              ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 scale-[1.01] shadow-xl"
              : "border-zinc-300 dark:border-zinc-700 hover:border-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          )}
        >
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
          />
          
          <div className="flex flex-col items-center gap-6 p-8 relative z-10">
            <div className={cn(
                "p-6 rounded-full transition-all duration-300 shadow-sm",
                isDragging 
                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 scale-110" 
                    : "bg-white text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 dark:group-hover:bg-zinc-700"
            )}>
              <FileUp className="size-10" />
            </div>
            <div className="text-center">
              <p className="text-base text-zinc-500 dark:text-zinc-400">
                Click to<span className="font-semibold text-emerald-600 dark:text-emerald-400"> Upload</span> or <span className="font-semibold text-emerald-600 dark:text-emerald-400">Drag and Drop</span>
              </p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider pt-2">
                PNG • JPG
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FooterUpload({ onUpload }: { onUpload: (files: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(Array.from(e.target.files));
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "group relative flex items-center justify-between w-full h-24 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden bg-zinc-50 dark:bg-zinc-900/50 px-6",
        isDragging
          ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 scale-[1.01] shadow-lg"
          : "border-zinc-300 dark:border-zinc-700 hover:border-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      )}
    >
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
      />
      
      <div className="flex items-center gap-4">
        <div className={cn(
            "p-3 rounded-full transition-all duration-300 shadow-sm flex-shrink-0",
            isDragging 
                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 scale-110" 
                : "bg-white text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 dark:group-hover:bg-zinc-700"
        )}>
          <FileUp className="size-6" />
        </div>
        <div className="text-left">
          <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium">
            Upload new X-ray
          </p>
          <p className="text-xs text-zinc-400">
            Click or drag & drop to analyze
          </p>
        </div>
      </div>
      
      <div className="hidden sm:block text-[10px] text-zinc-400 uppercase tracking-wider font-medium bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700">
        PNG • JPG
      </div>
    </div>
  );
}

function ChatInterface() {
  const transport = new DefaultChatTransport({ api: "/api/xray" });

  const { messages, sendMessage, status } = useChat({ transport });

  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    if (status === "submitted") {
      const interval = setInterval(() => {
        setLoadingIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
    setLoadingIndex(0);
  }, [status]);

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      {messages.length > 0 && (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-14 bg-background/80 backdrop-blur-sm border-b border-border/50">
          <Link href="https://github.com/Richieparrish/osteo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Activity className="size-4 text-emerald-500" />
            <span className="font-semibold text-sm">Osteo AI</span>
          </Link>
        </header>
      )}
      <Conversation>
        <ConversationContent className={cn("max-w-4xl mx-auto w-full p-4", messages.length > 0 && "pt-20")}>
          <AnimatePresence mode="popLayout">
            {messages.length === 0 ? (
               <motion.div 
                 key="hero"
                 exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
                 className="absolute inset-0 z-20"
               >
                 <HeroUpload onUpload={async (files) => {
                    const attachments = await Promise.all(
                      files.map(async (file) => {
                        const url = await new Promise<string>((resolve) => {
                          const reader = new FileReader();
                          reader.onload = () => resolve(reader.result as string);
                          reader.readAsDataURL(file);
                        });
                        return {
                          type: 'file',
                          url,
                          mediaType: file.type,
                          filename: file.name,
                        };
                      })
                    );
                    await sendMessage({ text: "Analyze this image", files: attachments as any });
                 }} />
               </motion.div>
            ) : (
                <>
                  {messages.map(({ role, parts }, index) => {
                    const attachments = parts.filter(
                      (part) => part.type === "file"
                    );
                    const textParts = parts.filter((part) => part.type === "text");

                    return (
                      <Message from={role} key={index}>
                        <MessageContent className="text-base md:text-lg leading-relaxed font-light">
                          {attachments.length > 0 && (
                            <MessageAttachments className="mb-4">
                              {attachments.map((attachment, i) => (
                                <MessageAttachment
                                  data={attachment}
                                  key={attachment.url ?? i}
                                />
                              ))}
                            </MessageAttachments>
                          )}
                          {textParts.map((part, i) => (
                            <MessageResponse key={i}>{part.text}</MessageResponse>
                          ))}
                        </MessageContent>
                      </Message>
                    );
                  })}
                  {status === "submitted" && (
                    <Message from="assistant">
                      <MessageContent className="text-base md:text-lg">
                        <Shimmer className="text-base md:text-lg text-muted-foreground">
                          {loadingMessages[loadingIndex]}
                        </Shimmer>
                      </MessageContent>
                    </Message>
                  )}
                </>
            )}
          </AnimatePresence>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {messages.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent dark:from-zinc-950 dark:via-zinc-950 z-40">
           <div className="max-w-2xl mx-auto w-full">
              <FooterUpload onUpload={async (files) => {
                 const attachments = await Promise.all(
                    files.map(async (file) => {
                      const url = await new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.readAsDataURL(file);
                      });
                      return {
                        type: 'file',
                        url,
                        mediaType: file.type,
                        filename: file.name,
                      };
                    })
                  );
                  await sendMessage({ text: "Analyze this image", files: attachments as any });
              }} />
           </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ChatInterface />
    </Suspense>
  );
}
