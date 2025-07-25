"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, Edit, Plus, Vote, User, Filter } from "lucide-react"

type Theme = {
  id: number
  title: string
  description?: string
  deadline?: string
  is_closed: boolean
  user_id: number
  created_at: string
}

// サンプルデータ
const sampleThemes: Theme[] = [
  {
    id: 1,
    title: "次回のチーム懇親会の場所を決めよう",
    description: "みんなで楽しめる場所を投票で決めましょう。予算は一人3000円程度で考えています。",
    deadline: "2024-02-15T18:00:00",
    is_closed: false,
    user_id: 1,
    created_at: "2024-01-20T10:00:00",
  },
  {
    id: 2,
    title: "新しいプロジェクト名の投票",
    description: "来月開始予定のプロジェクトの名前を決めます。",
    deadline: "2024-02-10T17:00:00",
    is_closed: false,
    user_id: 2,
    created_at: "2024-01-18T14:30:00",
  },
  {
    id: 3,
    title: "オフィスのBGM選択",
    description: "作業中に流すBGMのジャンルを投票で決めましょう。",
    deadline: "2024-01-25T12:00:00",
    is_closed: true,
    user_id: 1,
    created_at: "2024-01-15T09:00:00",
  },
  {
    id: 4,
    title: "来年度の研修内容について",
    description: "スキルアップのための研修内容を皆さんの意見を聞いて決めたいと思います。",
    deadline: "2024-03-01T23:59:00",
    is_closed: false,
    user_id: 3,
    created_at: "2024-01-22T16:45:00",
  },
]

export default function VotingBoard() {
  const router = useRouter()
  const [themes, setThemes] = useState<Theme[]>(sampleThemes)
  const [authUserId] = useState<number>(1) // 現在のユーザーID
  const [filter, setFilter] = useState<"all" | "in_progress" | "closed">("all")
  const [showMyThemes, setShowMyThemes] = useState<boolean>(false)
  const [sortOption, setSortOption] = useState<"created_asc" | "created_desc" | "deadline_asc" | "deadline_desc">(
    "deadline_asc",
  )

  const filteredThemes = themes.filter((theme) => {
    if (showMyThemes && theme.user_id !== authUserId) {
      return false
    }
    if (filter === "in_progress") {
      return !theme.is_closed
    }
    if (filter === "closed") {
      return theme.is_closed
    }
    return true
  })

  const sortedThemes = [...filteredThemes].sort((a, b) => {
    switch (sortOption) {
      case "created_asc":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      case "created_desc":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case "deadline_asc":
        return new Date(a.deadline || 0).getTime() - new Date(b.deadline || 0).getTime()
      case "deadline_desc":
        return new Date(b.deadline || 0).getTime() - new Date(a.deadline || 0).getTime()
      default:
        return 0
    }
  })

  const handleAddTask = () => {
    router.push("/vote/new")
  }

  const handleVote = (themeId: number) => {
    router.push(`/vote/${themeId}/choice`)
  }

  const handleEdit = (themeId: number) => {
    router.push(`/vote/${themeId}/edit`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    const hh = String(date.getHours()).padStart(2, '0')
    const min = String(date.getMinutes()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`
  }

  const isDeadlineSoon = (deadline: string) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffHours = (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60)
    return diffHours <= 24 && diffHours > 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">投票掲示板</h1>
          <p className="text-slate-800">みんなで決めよう、みんなの意見を聞こう</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* フィルターとソート */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-slate-800"/>
                <div className="text-slate-800">フィルター・並び替え</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all" className="text-slate-800">すべて</TabsTrigger>
                      <TabsTrigger value="in_progress" className="text-slate-800">進行中</TabsTrigger>
                      <TabsTrigger value="closed" className="text-slate-800">終了済み</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant={showMyThemes ? "default" : "outline"}
                    onClick={() => setShowMyThemes(!showMyThemes)}
                    className={`flex items-center gap-2 ${showMyThemes ? 'text-slate-800' : 'text-white'}`}
                  >
                    <User className="h-4 w-4" />
                    自分の投稿
                  </Button>

                  <Select value={sortOption} onValueChange={(value) => setSortOption(value as typeof sortOption)}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="created_desc" className="text-slate-800">作成日: 新しい順</SelectItem>
                      <SelectItem value="created_asc" className="text-slate-800">作成日: 古い順</SelectItem>
                      <SelectItem value="deadline_asc" className="text-slate-800">締切: 近い順</SelectItem>
                      <SelectItem value="deadline_desc" className="text-slate-800">締切: 遠い順</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 投票テーマ一覧 */}
          <div className="grid gap-6 mb-8">
            {sortedThemes.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-slate-400 mb-4">
                    <Vote className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-lg">該当する投票がありません</p>
                    <p className="text-sm">フィルターを変更するか、新しい投票を作成してみてください</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              sortedThemes.map((theme) => (
                <Card key={theme.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 text-slate-800">{theme.title}</CardTitle>
                        <CardDescription className="text-base text-slate-700">{theme.description}</CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={theme.is_closed ? "secondary" : "default"} className="text-slate-800">
                          {theme.is_closed ? "終了済み" : "進行中"}
                        </Badge>
                        {theme.deadline && !theme.is_closed && isDeadlineSoon(theme.deadline) && (
                          <Badge variant="destructive" className="text-xs text-slate-800">
                            締切間近！
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex flex-col gap-2 text-sm text-slate-800">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>作成: {formatDate(theme.created_at)}</span>
                        </div>
                        {theme.deadline && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className={theme.is_closed ? "line-through" : ""}>
                              締切: {formatDate(theme.deadline)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleVote(theme.id)}
                          disabled={theme.is_closed}
                          className={`flex items-center gap-2 ${!theme.is_closed ? 'bg-lime-500 hover:bg-lime-600 text-white' : 'bg-gray-300 text-gray-400'}`}
                        >
                          <Vote className="h-4 w-4" />
                          投票する
                        </Button>
                        {theme.user_id === authUserId && (
                          <Button
                            variant="outline"
                            onClick={() => handleEdit(theme.id)}
                            className="flex items-center gap-2 text-white"
                          >
                            <Edit className="h-4 w-4" />
                            編集
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* 新規投票作成ボタン */}
          <div className="text-center">
            <Button onClick={handleAddTask} size="lg" className="flex items-center gap-2 px-8 py-3">
              <Plus className="h-5 w-5" />
              新しい投票を作成
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
