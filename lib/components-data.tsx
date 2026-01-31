export interface Component {
  id: string
  title: string
  category: string
  description: string
  preview: string
  code: string
}

export const COMPONENTS: Component[] = [
  {
    id: "button-basic",
    title: "Basic Button",
    category: "Forms",
    description: "A simple button component with default styling",
    preview: `
      <button style="padding: 8px 16px; background-color: #5542ff; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
        Click me
      </button>
    `,
    code: `export function BasicButton() {
  return (
    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">
      Click me
    </button>
  )
}`,
  },
  {
    id: "button-outline",
    title: "Outline Button",
    category: "Forms",
    description: "A button with outline styling",
    preview: `
      <button style="padding: 8px 16px; background-color: transparent; color: #5542ff; border: 2px solid #5542ff; border-radius: 6px; cursor: pointer; font-weight: 500;">
        Outline
      </button>
    `,
    code: `export function OutlineButton() {
  return (
    <button className="px-4 py-2 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition">
      Outline
    </button>
  )
}`,
  },
  {
    id: "card-basic",
    title: "Basic Card",
    category: "Layout",
    description: "A simple card component for content grouping",
    preview: `
      <div style="background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; width: 100%; max-width: 200px; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">
        <div style="font-weight: 600; margin-bottom: 8px; color: #fff;">Card Title</div>
        <div style="font-size: 14px; color: #999;">Card content goes here</div>
      </div>
    `,
    code: `export function BasicCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <h3 className="font-semibold text-foreground mb-2">Card Title</h3>
      <p className="text-sm text-muted-foreground">Card content goes here</p>
    </div>
  )
}`,
  },
  {
    id: "badge-primary",
    title: "Primary Badge",
    category: "Indicators",
    description: "A badge component for labeling and categorizing",
    preview: `
      <span style="display: inline-block; padding: 4px 12px; background-color: #5542ff; color: white; border-radius: 20px; font-size: 12px; font-weight: 600;">
        New
      </span>
    `,
    code: `export function PrimaryBadge() {
  return (
    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
      New
    </span>
  )
}`,
  },
  {
    id: "input-field",
    title: "Text Input",
    category: "Forms",
    description: "A text input field component",
    preview: `
      <input type="text" placeholder="Enter text..." style="padding: 8px 12px; border: 1px solid #333; border-radius: 6px; background-color: #0f0f0f; color: #fff; font-size: 14px; width: 100%; max-width: 200px; outline: none; box-sizing: border-box;" />
    `,
    code: `export function TextInput() {
  return (
    <input
      type="text"
      placeholder="Enter text..."
      className="w-full px-3 py-2 border border-input bg-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
    />
  )
}`,
  },
  {
    id: "alert-info",
    title: "Info Alert",
    category: "Indicators",
    description: "An alert component for displaying messages",
    preview: `
      <div style="background-color: rgba(85, 66, 255, 0.1); border: 1px solid rgba(85, 66, 255, 0.3); border-radius: 6px; padding: 12px; color: #fff; font-size: 14px; border-left: 4px solid #5542ff;">
        This is an informational alert message.
      </div>
    `,
    code: `export function InfoAlert() {
  return (
    <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-blue-200 text-sm">
      This is an informational alert message.
    </div>
  )
}`,
  },
  {
    id: "avatar-circle",
    title: "Avatar Circle",
    category: "Media",
    description: "A circular avatar component for user profiles",
    preview: `
      <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #5542ff, #8b5cf6); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">
        AB
      </div>
    `,
    code: `export function AvatarCircle() {
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
      AB
    </div>
  )
}`,
  },
  {
    id: "progress-bar",
    title: "Progress Bar",
    category: "Indicators",
    description: "A progress bar component for showing completion status",
    preview: `
      <div style="width: 100%; height: 8px; background-color: #333; border-radius: 4px; overflow: hidden;">
        <div style="width: 65%; height: 100%; background-color: #5542ff;"></div>
      </div>
    `,
    code: `export function ProgressBar() {
  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <div className="h-full w-2/3 bg-primary transition-all" />
    </div>
  )
}`,
  },
  {
    id: "divider",
    title: "Divider",
    category: "Layout",
    description: "A divider component for visual separation",
    preview: `
      <div style="width: 100%; height: 1px; background-color: #333;"></div>
    `,
    code: `export function Divider() {
  return <div className="w-full h-px bg-border" />
}`,
  },
]
