"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save, ArrowLeft, Calendar, FileText, List, AlertCircle } from "lucide-react"

type ThemeForm = {
  title: string
  description?: string
  deadline?: string
  choices: { id: string; text: string }[]
}

export default function NewVotePage() {
  const router = useRouter()
  const [choices, setChoices] = useState([
    { id: crypto.randomUUID(), text: "" },
    { id: crypto.randomUUID(), text: "" },
  ])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const {
    register,
    handleSubmit,
    formState: { errors: rhfErrors, isSubmitting },
    watch,
  } = useForm<ThemeForm>({
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
    },
  })

  const watchedTitle = watch("title")
  const watchedDescription = watch("description")

  const handleAddChoice = () => {
    setChoices([...choices, { id: crypto.randomUUID(), text: "" }])
  }

  const handleRemoveChoice = (id: string) => {
    if (choices.length > 1) {
      setChoices(choices.filter((choice) => choice.id !== id))
    }
  }

  const updateChoiceText = (id: string, text: string) => {
    const updatedChoices = choices.map((c) => (c.id === id ? { ...c, text } : c))
    setChoices(updatedChoices)
  }

  const onSubmit = async (data: ThemeForm) => {
    // バリデーション
    const newErrors: { [key: string]: string } = {}

    const validChoices = choices.filter((choice) => choice.text.trim() !== "")
    if (validChoices.length < 2) {
      newErrors.choices = "選択肢は最低2つ必要です"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    data.choices = validChoices

    // 実際の実装では、ここでAPIを呼び出す
    console.log("投票テーマを作成:", data)

    // 成功時の処理（実際の実装では成功レスポンスを待つ）
    setTimeout(() => {
      router.push("/")
    }, 1000)
  }

  const handleCancel = () => {
    router.push("/")
  }

  const validChoicesCount = choices.filter((choice) => choice.text.trim() !== "").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* ヘッダー */}
          <div className="mb-8">
            <Button variant="ghost" onClick={handleCancel} className="mb-4 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              戻る
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">新しい投票を作成</h1>
              <p className="text-slate-600">みんなの意見を聞いてみましょう</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 基本情報 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-black" />
                  <span className="text-black">基本情報</span>
                </CardTitle>
                <CardDescription className="text-black">投票のタイトルと説明を入力してください</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    タイトル <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="例: 次回のチーム懇親会の場所を決めよう"
                    {...register("title", {
                      required: "タイトルは必須です",
                      minLength: { value: 3, message: "タイトルは3文字以上で入力してください" },
                    })}
                    className={`bg-white text-slate-800 ${rhfErrors.title ? 'border-red-500' : ''}`}
                  />
                  {rhfErrors.title && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {rhfErrors.title.message}
                    </div>
                  )}
                  <div className="text-xs text-slate-500">{watchedTitle?.length || 0}/100文字</div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-slate-800">
                    説明（任意）
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="投票の詳細や背景を説明してください"
                    rows={3}
                    {...register("description", {
                      maxLength: { value: 500, message: "説明は500文字以内で入力してください" },
                    })}
                    className={`bg-white text-slate-800 ${rhfErrors.description ? 'border-red-500' : ''}`}
                  />
                  {rhfErrors.description && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {rhfErrors.description.message}
                    </div>
                  )}
                  <div className="text-xs text-slate-500">{watchedDescription?.length || 0}/500文字</div>
                </div>
              </CardContent>
            </Card>

            {/* 締切設定 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-black" />
                  <span className="text-black">締切設定</span>
                </CardTitle>
                <CardDescription className="text-black">投票の締切日時を設定してください（任意）</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-sm font-medium">
                    締切日時
                  </Label>
                  <Input
                    id="deadline"
                    type="datetime-local"
                    {...register("deadline")}
                    min={new Date().toISOString().slice(0, 16)}
                    className="bg-white text-slate-800"
                  />
                  <p className="text-xs text-slate-500">締切を設定しない場合、手動で投票を終了するまで継続されます</p>
                </div>
              </CardContent>
            </Card>

            {/* 選択肢 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="h-5 w-5 text-black" />
                  <span className="text-black">選択肢</span>
                  <Badge variant="secondary" className="ml-2">
                    {validChoicesCount}個
                  </Badge>
                </CardTitle>
                <CardDescription className="text-black">投票の選択肢を追加してください（最低2つ必要）</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {errors.choices && (
                  <div className="flex items-center gap-1 text-red-500 text-sm bg-red-50 p-3 rounded-md">
                    <AlertCircle className="h-4 w-4" />
                    {errors.choices}
                  </div>
                )}

                <div className="space-y-3">
                  {choices.map((choice, idx) => (
                    <div key={choice.id} className="flex items-center gap-3 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm font-medium text-slate-600">
                        {idx + 1}
                      </div>
                      <Input
                        placeholder={`選択肢 ${idx + 1}`}
                        value={choice.text}
                        onChange={(e) => updateChoiceText(choice.id, e.target.value)}
                        className="flex-1 bg-white text-slate-800"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveChoice(choice.id)}
                        disabled={choices.length <= 1}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddChoice}
                  className="w-full flex items-center gap-2 bg-transparent"
                  disabled={choices.length >= 10}
                >
                  <Plus className="h-4 w-4" />
                  選択肢を追加
                </Button>

                <p className="text-xs text-slate-500">最大10個まで選択肢を追加できます</p>
              </CardContent>
            </Card>

            {/* アクションボタン */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting || validChoicesCount < 2}
                    className="flex items-center gap-2 px-8 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4" />
                    {isSubmitting ? "作成中..." : "投票を作成"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    キャンセル
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}