import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Borrowing, Collection } from '@/types';
import CSRF from './csrf';
//import { Input } from "@/components/ui/input"

export default function Collect({ borrowing, collections }: { borrowing: Borrowing; collections: Collection[] }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Simpan</Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="space-y-6 sm:max-w-[425px]">
                {/* Header */}
                <AlertDialogHeader className="space-y-2">
                    <h1 className="text-2xl font-extrabold">{borrowing.book.title}</h1>
                    <hr className="border-muted" />
                    <AlertDialogTitle>Simpan ke koleksi</AlertDialogTitle>
                    <AlertDialogDescription>
                        Simpan buku ini ke koleksi Anda untuk referensi di masa mendatang. Anda dapat mengaksesnya kapan saja melalui halaman koleksi
                        Anda.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {/* Form */}
                <form action={route('collections.add', borrowing.id)} method="POST" encType="multipart/form-data" className="space-y-4">
                    {/* CSRF */}
                    <CSRF />

                    {/*<details className="hover:cursor-pointer">
                        <summary>
                            Tambah Koleksi
                        </summary>
                        <Label htmlFor="collection_name">
                            Nama Koleksi
                        </Label>
                        <Input
                            id="collection_name"
                            name="collection_name"
                            defaultValue="New collection"
                            className="col-span-3" />

                    </details>*/}

                    <Label htmlFor="collection_id">Pilih Koleksi</Label>
                    <Select name="collection_id">
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih koleksi" />
                        </SelectTrigger>
                        <SelectContent>
                            {collections.map((collection) => (
                                <SelectItem key={collection.id} value={String(collection.id)}>
                                    {collection.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Footer / Actions */}
                    <AlertDialogFooter>
                        <AlertDialogCancel type="button">Batal</AlertDialogCancel>
                        <AlertDialogAction type="submit">Simpan</AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
