import { IsArray, IsBoolean, IsDate, IsInt, IsNumber, IsOptional, IsString, IsUrl, Min } from 'class-validator'

export class UpdatePostDto {
  @IsString()
  id: string

  @IsArray()
  @IsString({ each: true })
  subbreditNames: string

  @IsString()
  title: string

  @IsUrl()
  @IsOptional()
  imageUrl?: string

  @IsString()
  @IsOptional()
  text?: string

  @IsInt()
  @Min(0)
  send_at: number

  @IsBoolean()
  isNSFW: boolean
}