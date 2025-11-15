import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import "highlight.js/styles/github-dark.css";

interface ChatMessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-in fade-in-50 slide-in-from-bottom-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:text-slate-100">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeHighlight]}
            components={
              {
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <code className={className} {...rest}>
                      {children}
                    </code>
                  ) : (
                    <code className="bg-slate-800 text-slate-100 px-1.5 py-0.5 rounded text-sm" {...rest}>
                      {children}
                    </code>
                  );
                },
                pre(props) {
                  return (
                    <pre className="overflow-x-auto rounded-lg p-4 my-2">
                      {props.children}
                    </pre>
                  );
                },
                p(props) {
                  return <p className="mb-4 last:mb-0 leading-relaxed">{props.children}</p>;
                },
                br() {
                  return <br className="block mb-2" />;
                },
              } as Components
            }
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
