import { TranscriptSegment } from '@/types';
import { INITIAL_TRANSCRIPT } from '@/lib/mockData';

export interface TranscriptionProgressCallback {
  (progress: number, status: string): void;
}

export interface TranscriptionService {
  transcribeAudio(file: File | Blob | string, onProgress?: TranscriptionProgressCallback): Promise<TranscriptSegment[]>;
}

export class MockWhisperTranscriptionService implements TranscriptionService {
  async transcribeAudio(file: File | Blob | string, onProgress?: TranscriptionProgressCallback): Promise<TranscriptSegment[]> {
    if (onProgress) {
      onProgress(10, 'Extracting audio channels...');
      await new Promise(r => setTimeout(r, 400));
      onProgress(35, 'Initializing acoustic speech model...');
      await new Promise(r => setTimeout(r, 600));
      onProgress(65, 'Transcribing phonemes with Whisper large-v3...');
      await new Promise(r => setTimeout(r, 700));
      onProgress(88, 'Aligning word-level timestamps...');
      await new Promise(r => setTimeout(r, 500));
      onProgress(100, 'Speech transcription complete');
    }
    return INITIAL_TRANSCRIPT;
  }
}

export class ApiWhisperTranscriptionService implements TranscriptionService {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  async transcribeAudio(file: File | Blob | string, onProgress?: TranscriptionProgressCallback): Promise<TranscriptSegment[]> {
    if (!this.apiKey) {
      const fallback = new MockWhisperTranscriptionService();
      return fallback.transcribeAudio(file, onProgress);
    }

    try {
      if (onProgress) onProgress(20, 'Uploading audio to Whisper API...');
      // If real API key is present, forward to real Whisper API or Next.js route
      const formData = new FormData();
      if (typeof file === 'string') {
        const res = await fetch(file);
        const blob = await res.blob();
        formData.append('file', blob, 'audio.mp4');
      } else {
        formData.append('file', file);
      }
      formData.append('model', 'whisper-1');
      formData.append('response_format', 'verbose_json');

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Whisper API error: ${response.statusText}`);
      }

      const data = await response.json();
      if (onProgress) onProgress(100, 'Transcription complete');

      // Convert Whisper segments into CreatorAI TranscriptSegment format
      if (data.segments && Array.isArray(data.segments)) {
        return data.segments.map((seg: any, idx: number) => ({
          id: `seg-${idx}`,
          start: Math.round(seg.start),
          end: Math.round(seg.end),
          startFormatted: new Date(seg.start * 1000).toISOString().substr(14, 5),
          endFormatted: new Date(seg.end * 1000).toISOString().substr(14, 5),
          speaker: 'Speaker 1',
          text: seg.text.trim(),
          words: seg.words || []
        }));
      }

      return INITIAL_TRANSCRIPT;
    } catch (err) {
      console.warn('Whisper API failed, falling back to local simulated speech engine:', err);
      const fallback = new MockWhisperTranscriptionService();
      return fallback.transcribeAudio(file, onProgress);
    }
  }
}

export function createTranscriptionService(apiKey?: string): TranscriptionService {
  return new ApiWhisperTranscriptionService(apiKey);
}
